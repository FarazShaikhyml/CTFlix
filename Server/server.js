const express = require("express");
const multer = require("multer");
const cors = require("cors");
const s3 = require("./AwsConfig");

const app = express();
app.use(cors());
const port = 9000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.post("/upload", upload.single("file"), async (req, res) => {
  const blobName = req.file.originalname;
  const uploadToS3 = async (file) => {
    try {
      const command = {
        Bucket: "farazs3",
        Key: blobName,
        Body: file,
      };
      s3.upload(command)
        .promise()
        .then(
          (val) => {
            console.log(val);
          },
          (err) => {
            console.log(err);
          }
        );
    } catch (err) {
      console.error(err);
    }
  };
  try {
    const data = req.file.buffer;
    await uploadToS3(data);
    console.log(`File uploaded: ${blobName}`);
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "File upload failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
