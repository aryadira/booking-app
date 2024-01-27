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

// api/hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

// api/hotels/add
router.post(
  "/add",
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
      const imageUrls = await uploadImages(imageFiles);
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

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  const hotel = await Hotel.findOne({
    _id: id,
    userId: req.userId,
  });
  res.json(hotel);
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files as Express.Multer.File[];
    const updateImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updateImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went throw" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const response = await cloudinary.v2.uploader.upload(dataURI);
    return response.url;
  });

  // 2. if success , add url to new hotel
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
