const Admin = require('../../model/adminSchema');

const updateAdmin = async (req, res) => {
  const { username, email, phoneNumber, address, city, country } = req.body;
  if(req.user.role!=='admin'){
    return res.status(404).json({ message: 'You not authorized!' });
  }
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { username, email, phoneNumber, address, city, country },
      { new: true, runValidators: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(updatedAdmin);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={updateAdmin}