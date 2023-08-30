
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Admin = require('../../model/adminSchema');

dotenv.config();

const Login= async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: existingAdmin._id, email: existingAdmin.email },
      process.env.JWT_ADMIN,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, admin: existingAdmin });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

module.exports = {Login};
