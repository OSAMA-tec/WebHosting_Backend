
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const Billing = require('../../model/billingSchema');
const Package = require('../../model/packageSchema');
const generatePdf = require('../../utils/pdfgenerter');
const path = require('path');
const fs = require('fs');


const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendBillingInfoViaEmail(email, filePath) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Billing Information';
    sendSmtpEmail.htmlContent = '<p>Please find your billing information attached.</p>';
    sendSmtpEmail.sender = { email: 'janghir@email.com', name: 'Janghir' };
    sendSmtpEmail.attachment = [
      {
        content: fs.readFileSync(filePath).toString('base64'),
        name: 'billing-info.pdf',
        contentType: 'application/pdf',
      },
    ];
  
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }


const createBilling = async (req, res) => {
  try {
    const userId = req.user.id;
    const billingData = { ...req.body, userId };
    const billing = await Billing.create(billingData);

    const package = await Package.findById(billing.packageId);

    const filePath = path.join(__dirname, 'temp', 'billing-info.pdf');
    generatePdf(billing, package, filePath);

    await sendBillingInfoViaEmail(req.body.email, filePath);

    fs.unlinkSync(filePath);

    res.status(201).json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={createBilling}