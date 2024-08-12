const router = require("express").Router();
const { MongoClient, GridFSBucket } = require("mongodb");
const multer = require("multer");
const { Readable } = require("stream");
const { v4: uuidv4 } = require("uuid");

// MongoDB URI
const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/beauty-hub";

// Create MongoDB client
const client = new MongoClient(mongoURI);

let bucket;

//  Connect to MongoDB and initialize GridFSBucket
client
  .connect()
  .then(() => {
    const db = client.db();
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload file
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filename = uuidv4();
  const uploadStream = bucket.openUploadStream(filename);
  const readableStream = Readable.from(req.file.buffer);
  readableStream.pipe(uploadStream);

  uploadStream.on("finish", () => {
    res.status(201).json({
      file: { filename: filename },
      message: "File uploaded successfully",
    });
  });

  uploadStream.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});

// Route to retrieve file
router.get("/image/:filename", (req, res) => {
  const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("end", () => {
    res.end();
  });

  downloadStream.on("error", (err) => {
    res.status(404).json({ error: "File not found" });
  });
});

module.exports = router;
