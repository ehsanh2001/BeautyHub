const { Schema, model } = require("mongoose");

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  imageFileName: {
    type: String,
  },
  // Define the type of business (e.g. "Hair Salon", "Nail Salon", "Spa")
  businessType: {
    type: String,
    required: true,
  },
  services: [
    {
      serviceName: String,
      required: true,
    },
    {
      price: Number,
      required: true,
    },
  ],
  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  staff: [
    {
      name: { String, required: true },
      imageFileName: String,
      booking: [
        {
          type: Schema.Types.ObjectId,
          ref: "Booking",
        },
      ],
    },
  ],
  // Define the opening hours of the business
  // The day is a string representing the day of the week (e.g. "Monday")
  // hours is an array of strings representing one hour slot (e.g. ["09:00"] means 9:00-10:00)])
  openingHours: [
    {
      day: String,
      hours: [String],
    },
  ],
});

// Method to upload an image to GridFS
imageSchema.statics.uploadImage = function (file) {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  return new Promise((resolve, reject) => {
    const writeStream = gfs.openUploadStream(file.filename);

    file.stream
      .pipe(writeStream)
      .on("error", (error) => reject(error))
      .on("finish", (uploadedFile) => resolve(uploadedFile));
  });
};

// Method to retrieve an image by filename
imageSchema.statics.findImageByFilename = function (filename) {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  return gfs.openDownloadStreamByName(filename);
};

// Method to retrieve an image by ID (optional, useful for specific retrieval)
imageSchema.statics.findImageById = function (id) {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  return gfs.openDownloadStream(mongoose.Types.ObjectId(id));
};

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
