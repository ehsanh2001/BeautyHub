// const { signToken, AuthenticationError } = require("../utils/auth");

const { ApolloError } = require("apollo-server-express");
const mongoose = require("mongoose");
const {
  Business,
  Customer,
  Booking,
  TypeAndServices,
  User,
} = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");
const { ObjectId } = require("mongodb");

const resolvers = {
  Query: {
    // TODO: Implement the image resolver

    // async image(_, { filename }) {
    //   // Logic to fetch the image by filename
    //   // Assuming you have a method to fetch image URL
    //   return { url: `https://your-cdn.com/images/${filename}` };
    // },

    async businesses() {
      return await Business.find().populate("owner");
    },

    async businessesByType(_, { businessType }) {
      return await Business.find({ businessType });
    },

    async business(_, { userId }) {
      return await Business.findOne({ owner: userId }).populate("owner");
    },
    //Business search query
    async businessNearby(_, { lat, lng, maxDistance }) {
      return await Business.find({
        location: {
          $geoWithin: {
            $centerSphere: [[lng, lat], maxDistance / 6378.1],
          },
        },
      });
    },

    async customer(_, { id }) {
      return await Customer.findById(id);
    },
  },

  Mutation: {
    async addCustomer(_, { name, phone }) {
      const customer = new Customer({ name, phone });
      return await customer.save();
    },

    async addBooking(_, { date, customer, business, staffName, service }) {
      const booking = new Booking({
        date,
        customer,
        business,
        staffName,
        service,
      });
      return await booking.save();
    },

    async deleteBooking(_, { id }) {
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) {
        throw new ApolloError("Booking not found", "NOT_FOUND");
      }
      return booking;
    },

    async addBusiness(
      _,
      {
        owner,
        businessName,
        businessType,
        services,
        address,
        phone,
        location,
        staff,
        openingHours,
        imageFileName,
      }
    ) {
      try {
        const business = {
          owner: owner,
          businessName: businessName,
          businessType: businessType,
          services: services,
          address: address,
          phone: phone,
          location: location,
          staff: staff,
          openingHours: openingHours,
          imageFileName: imageFileName,
        };
        console.log("business", business);
        const result = await Business.findOneAndUpdate(
          { owner: owner },
          business,
          {
            upsert: true,
            new: true,
          }
        );
        return result;
      } catch (error) {
        console.error("Error adding business:", error);
        throw new ApolloError("Error adding business", "ADD_BUSINESS_ERROR");
      }
    },

    async addUser(_, { username, password, role }) {
      let user = new User({ username, password, role });

      const token = signToken(user);

      user = await user.save();
      const result = { token: token, user: user };
      return result;
    },

    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) {
        throw new ApolloError("Invalid credentials", "INVALID_CREDENTIALS");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);
      // Generate a real token with your auth logic
      return { token: token, user: user };
    },
  },
};

module.exports = resolvers;
