const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "business-owner", "staff"],
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew() || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
