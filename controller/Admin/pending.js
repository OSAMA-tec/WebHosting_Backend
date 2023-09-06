const Order = require('../../model/orderSchema');

const getUnacceptedOrders = async (req, res) => {
  try {
    const unacceptedOrders = await Order.find({ paymentStatus: { $ne: 'Accept Order' } });
    res.json(unacceptedOrders);
  } catch (err) {
    res.status(500).send("Server error");
  }
};


module.exports={getUnacceptedOrders}