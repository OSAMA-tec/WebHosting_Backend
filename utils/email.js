
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Function to send OTP via Email using Sendinblue
async function sendOtpViaEmail(email, otp) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.subject = 'Your OTP';
  sendSmtpEmail.htmlContent = `<p>Your OTP is: ${otp}</p>`;
  sendSmtpEmail.sender = { email: 'osama@email.com', name: 'OSAMA' };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}


module.exports={sendOtpViaEmail}