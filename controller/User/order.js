const Order = require('../../model/orderSchema');

const getAcceptedOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ clientId: userId, paymentStatus: 'Accept Order' }).populate('packageId');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={getAcceptedOrders};