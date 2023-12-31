const User = require('../../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {sendOtpViaEmail}=require('../../utils/email')
const registerUser = async (req, res) => {
  const { password } = req.body;
  const tempEmail = req.body.email;
  const username = req.body.username;

  if (!username || !tempEmail) {
    return res.status(400).json({ msg: 'Username or Email required' });
  }

  try {
    let userE = await User.deleteMany({ tempEmail });
   
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
        expiresIn: '60 days'
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
