const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;
