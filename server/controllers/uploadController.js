const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    console.log("Upload route hit");
    console.log("File received:", req.file ? "YES" : "NO");
    console.log("Buffer size:", req.file.buffer.length);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "travelsphere",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    console.log("Secure URL:", result.secure_url);

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

  } catch (error) {
    console.log("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadImage };