const Subscriber = require("../models/subscribe");
const { StatusCodes } = require("http-status-codes");

const AddSubscriber = async (req, res) => {
  const subscriber = await Subscriber.create(req.body);

  res.status(StatusCodes.CREATED).json({ subscriber });
};
module.exports = { AddSubscriber };
