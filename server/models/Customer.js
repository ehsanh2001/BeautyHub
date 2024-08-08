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
  booking: [
    {
      date: Date,
      time: String,
      business: {
        type: Schema.Types.ObjectId,
        ref: "Business",
      },
      staffName: {
        type: String,
        required: true,
      },
      service: {
        type: String,
        required: true,
      },
    },
  ],
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;
