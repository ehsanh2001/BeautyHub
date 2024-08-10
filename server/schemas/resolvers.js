const { signToken, AuthenticationError } = require("../utils/auth");
const { ApolloError } = require("apollo-server-express");
const mongoose = require("mongoose");
const {
  Business,
  Customer,
  Booking,
  TypeAndServices,
  User,
} = require("../models");

const resolvers = {
  Query: {
    // TODO: Implement the image resolver

    // async image(_, { filename }) {
    //   // Logic to fetch the image by filename
    //   // Assuming you have a method to fetch image URL
    //   return { url: `https://your-cdn.com/images/${filename}` };
    // },

    async businesses() {
      return await Business.find();
    },

    async businessesByType(_, { businessType }) {
      return await Business.find({ businessType });
    },

    async business(_, { id }) {
      return await Business.findById(id);
    },
    //Business search query
    async businessNearby(_, { lat, lng, maxDistance }) {
      return await Business.find({
        location: {
          $geoWithin: {
            $centerSphere: [[lng, lat], maxDistance / 6378.1]
          }
        }
      })
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
        businessName,
        businessType,
        services,
        address,
        phone,
        location,
        staff,
        openingHours,
      }
    ) {
      const typeAndServices = await TypeAndServices.findOne({ businessType });
      const business = new Business({
        businessName,
        businessType,
        services: typeAndServices ? typeAndServices.services : services,
        address,
        phone,
        location,
        staff,
        openingHours,
      });
      return await business.save();
    },
    //upload image mutation
    async uploadImage(_, { businessId, file }) {
      try {
        const { createReadStream, filename, mimetype, encoding } = file;

        const uploadedFile = await Business.uploadImage(businessId, {
          filename,
          stream: createReadStream()
        });

        return await Business.findById(businessId);
      } catch (error) {
        console.error(error);
      }
    },

    async addStaff(_, { businessName, name, imageFileName }) {
      const business = await Business.findOne({ businessName });
      if (!business) {
        throw new ApolloError("Business not found", "NOT_FOUND");
      }
      business.staff.push({ name, imageFileName });
      return await business.save();
    },

    async deleteStaff(_, { businessName, staffName }) {
      const business = await Business.findOne({ businessName });
      if (!business) {
        throw new ApolloError("Business not found", "NOT_FOUND");
      }
      business.staff = business.staff.filter(
        (staff) => staff.name !== staffName
      );
      return await business.save();
    },

    async addUser(_, { username, password, role }) {
      const user = new User({ username, password, role });
      const token = "generated-token"; // Generate a real token with your auth logic
      return { token, user: await user.save() };
    },

    async login(_, { username, password }) {
      const user = await User.findOne({ username, password });
      if (!user) {
        throw new ApolloError("Invalid credentials", "INVALID_CREDENTIALS");
      }
      const token = "generated-token"; // Generate a real token with your auth logic
      return { token, user };
    },
  },

  Business: {
    async services(parent) {
      // Logic to fetch services based on the business
      return parent.services;
    },
    async staff(parent) {
      // Logic to fetch staff based on the business
      return parent.staff;
    },
    async openingHours(parent) {
      // Logic to fetch opening hours based on the business
      return parent.openingHours;
    },
  },

  Service: {
    // Any custom resolver for Service type can go here
  },

  Customer: {
    async bookings(parent) {
      return await Booking.find({ customer: parent.id });
    },
  },

  Booking: {
    async customer(parent) {
      return await Customer.findById(parent.customer);
    },
    async business(parent) {
      return await Business.findById(parent.business);
    },
    async service(parent) {
      // Assuming `service` field in booking is stored as ServiceInput
      return parent.service;
    },
  },

  Staff: {
    async bookings(parent) {
      return await Booking.find({ staffName: parent.name });
    },
  },
};

module.exports = resolvers;
