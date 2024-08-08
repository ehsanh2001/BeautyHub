const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GridFSBucket = mongoose.mongo.GridFSBucket;

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  imageFileName: {
    type: String,
  },
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
      name: { type: String, required: true },
      imageFileName: String,
      booking: [
        {
          type: Schema.Types.ObjectId,
          ref: "Booking",
        },
      ],
    },
  ],
  openingHours: [
    {
      day: String,
      hours: [String],
    },
  ],
});

// Method to upload an image to GridFS and set the filename
businessSchema.statics.uploadImage = function (businessId, file) {
  const gfs = new GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  return new Promise((resolve, reject) => {
    const writeStream = gfs.openUploadStream(file.filename);
    file.stream
      .pipe(writeStream)
      .on("error", reject)
      .on("finish", async (uploadedFile) => {
        try {
          // Update business with the image file name
          await this.findByIdAndUpdate(businessId, {
            imageFileName: file.filename,
          });
          resolve(uploadedFile);
        } catch (err) {
          reject(err);
        }
      });
  });
};

// Method to retrieve an image by filename
businessSchema.statics.getImageByFilename = function (filename) {
  const gfs = new GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  return gfs.openDownloadStreamByName(filename);
};

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
