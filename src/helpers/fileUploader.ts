import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";

// Configuration
cloudinary.config({
  cloud_name: "dpkri6czk",
  api_key: "979847518986386",
  api_secret: "fNwiG1lqYa6zGVlSqmtzl8Ym5tQ",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined | any> => {
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: file.originalname,
      })
      .then((result) => {
        fs.unlinkSync(file.path);
        return result;
      });
    return uploadResult;
  } catch (error) {
    console.log(error);
  }

  // console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url("shoes", {
  //   fetch_format: "auto",
  //   quality: "auto",
  // });

  // console.log(optimizeUrl);

  // // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url("shoes", {
  //   crop: "auto",
  //   gravity: "auto",
  //   width: 500,
  //   height: 500,
  // });

  // console.log(autoCropUrl);
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
