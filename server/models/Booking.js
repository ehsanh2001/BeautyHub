const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
  staffName: {
    type: String,
    required: true,
  },
  service: {
    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
