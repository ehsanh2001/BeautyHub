const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const initOpeningHours = {
  Monday: new Array(timeSlots.length).fill(true),
  Tuesday: new Array(timeSlots.length).fill(true),
  Wednesday: new Array(timeSlots.length).fill(true),
  Thursday: new Array(timeSlots.length).fill(true),
  Friday: new Array(timeSlots.length).fill(true),
  Saturday: new Array(timeSlots.length).fill(true),
  Sunday: new Array(timeSlots.length).fill(true),
};

const formDataInit = {
  businessName: "",
  businessType: "",
  services: [
    // {
    //   serviceName: "Web Development",
    //   price: 1500.0,
    // },
    // {
    //   serviceName: "Mobile App Development",
    //   price: 2000.0,
    // },
  ],
  address: "",
  phone: "",
  location: {
    // type: "Point",
    // coordinates: [-96.7969879, 32.7766642],
  },
  staff: [
    // {
    //   name: "John Doe",
    //   password: "SecurePass123!",
    // },
    // {
    //   name: "Jane Smith",
    //   password: "AnotherSecurePass456!",
    // },
  ],
  openingHours: initOpeningHours,
};

export default formDataInit;
