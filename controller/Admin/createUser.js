const User = require('../../model/userSchema');
const { sendDetailsViaEmail } = require('../../utils/email');

const createUser = async (req, res) => {
  const user = new User(req.body);
  if(req.user.role!=='admin'){
    return res.status(404).json({ message: 'You not authorized!' });
  }
  try {
    const savedUser = await user.save();

    // Send user details via email
    await sendDetailsViaEmail(savedUser.email, savedUser);

    res.json(savedUser);
  } catch (err) {
    res.status(500).send("Server error");
  }
};


module.exports={createUser}