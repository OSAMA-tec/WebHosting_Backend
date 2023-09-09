const User = require('../../model/userSchema');

const updateUser = async (req, res) => {
  try {

const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={updateUser}