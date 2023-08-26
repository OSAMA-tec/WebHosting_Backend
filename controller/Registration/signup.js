const User = require('../../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();


SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

// Function to send OTP via Email using Sendinblue
async function sendOtpViaEmail(email, otp) {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  console.log(email)
  console.log(otp)
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.subject = 'Hosting APP OTP';
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: Arial, sans-serif;
        }
      </style>
    </head>
    <body>
      <h1>Hosting APP OTP</h1>
      <p>Your OTP is: ${otp}</p>
    </body>
    </html>
  `;
  sendSmtpEmail.sender = { email: process.env.EMAIL_FROM, name: 'Hosting App' };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

const registerUser = async (req, res) => {
  const { password } = req.body;
  const tempEmail = req.body.email;
  const username = req.body.username;

  if (!username || !tempEmail) {
    return res.status(400).json({ msg: 'Username or Email required' });
  }

  try {
    let userE = await User.DeleteOne({ tempEmail });
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const verified = false;

    userE = new User({
      username,
      tempEmail,
      password: hashedPassword,
      otp,
      verified
    });

    await userE.save();
    await sendOtpViaEmail(tempEmail, otp);
    
    res.json({
      message: 'Registered successfully, please check your email for OTP',
      user: {
        id: userE._id,
        username: userE.username,
        email: userE.tempEmail,
        verified: userE.verified
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const verifyUser = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ msg: 'OTP and Email are required' });
  }

  try {
    const user = await User.findOne({ tempEmail: email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ msg: 'User is already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: 'Incorrect OTP' });
    }

    user.email = user.tempEmail;
    user.tempEmail = null;
    user.otp = null;
    user.verified = true;

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '5 days'
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports={registerUser,verifyUser}