import pic from "../assets/images/alexa.png"
const db = require("../config/connection");
const { Business, Customer, Booking, User } = require("../models"); // Adjust imports according to your project structure

db.once("open", async () => {
  try {
    // Clear existing data
    await Business.deleteMany({});
    await Customer.deleteMany({});
    await Booking.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      { username: "alen chriss", password: "password123", role: "staff" },
      { username: "alexa joe", password: "password123", role: "staff" },
      { username: "justin morris", password: "password123", role: "customer" },
    ]);

    // Create sample customers
    const customers = await Customer.insertMany([
      { name: "John Doe", phone: "123-456-7890", bookings: [] },
      { name: "Jane Smith", phone: "987-654-3210", bookings: [] },
    ]);

    // Create sample businesses
    const businesses = await Business.insertMany([
      {
        owner: users[0]._id,
        businessName: "Glamour Salon",
        businessType: "Beauty",
        services: [
          { serviceName: "Haircut", price: 30.0 },
          { serviceName: "Manicure", price: 25.0 },
        ],
        address: "123 Main St, Hometown",
        phone: "555-555-5555",
        location: { type: "Point", coordinates: [-80.1917902, 25.7616798] },
        staff: [{ name: "Sarah Lee", imageFileName: pic }],
        openingHours: {
          Monday: [false, true, true, true, true, true, false],
          Tuesday: [false, true, true, true, true, true, false],
          Wednesday: [false, true, true, true, true, true, false],
          Thursday: [false, true, true, true, true, true, false],
          Friday: [false, true, true, true, true, true, false],
          Saturday: [false, true, true, true, true, true, false],
          Sunday: [false, false, false, false, false, false, false],
        },
        imageFileName: "glamour_salon.png",
      },
    ]);


    console.log("Sample data seeded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});
