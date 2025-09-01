import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config();



// Cloudinary config (use env vars for security)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload single file buffer
export const uploadToCloudinary = (fileBuffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Delete image from Cloudinary (optional, for product deletion or update)
// export const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };


// Delete from cloudinary
export const deleteFromCloudinary = async (url) => {
  try {
    // Extract public_id from url
    const parts = url.split("/");
    const filename = parts.pop().split(".")[0]; // abc123
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/"); // products
    const publicId = `${folder}/${filename}`;

    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return false;
  }
};