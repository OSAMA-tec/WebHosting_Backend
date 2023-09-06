const Order = require('../../model/orderSchema');

const getAcceptedOrders = async (req, res) => {
  try {
    const acceptedOrders = await Order.find({ paymentStatus: 'Accept Order' });
    res.json(acceptedOrders);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports={getAcceptedOrders}