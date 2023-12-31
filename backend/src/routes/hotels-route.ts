import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { body } from "express-validator";

import Hotel, { HotelType } from "../models/hotel-model";
import verifyToken from "../middlewares/auth-middleware";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// api/me/hotels
router.post(
  "/me",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isNumeric().withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1. upload to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const response = await cloudinary.v2.uploader.upload(dataURI);
        return response.url;
      });

      // 2. if success , add url to new hotel

      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // 3. save new hotel
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. return 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log("Error creating hotel:", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
