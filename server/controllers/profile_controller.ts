import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { ProfileRepository } from "../repositories/profile_repository"; // Import your recipe repository
import multer from 'multer';

export const EditProfileController = (profileRepository: ProfileRepository, upload: multer.Multer) => {
    const router = Router();
    //Route for creating a recipe
    router.post("/change_password", authMiddleware, async (req, res) => {
        const userId = req.user?.id;
        const { newPassword } = req.body;
        if (userId && newPassword) {
          await profileRepository.updatePassword(userId, newPassword);
          res.json({ message: "Password updated successfully" }); // Send a JSON response
        } else {
          res.status(400).json({ error: "User ID or new password not provided in request" });
        }
      });
    
      router.post("/change_profile_picture", authMiddleware, async (req, res) => {
        const userId = req.user?.id;
        const { profile_image_url } = req.body;
        if (userId && profile_image_url) {
          await profileRepository.updateProfilePicture(userId, profile_image_url);
          res.sendStatus(200);
        } else {
          res.status(400).json({ error: "User ID or profile image URL not provided in request" });
        }
      });

      router.post("/upload_profile_image", authMiddleware, upload.single('profileImage'), async (req, res) => {
        const userId = req.user?.id;
        if (userId && req.file) {
          await profileRepository.updateProfilePicture(userId, req.file.path);
          res.json({ message: "Profile picture updated successfully" });
        } else {
          res.status(400).json({ error: "User ID or file not provided in request" });
        }
      });
    return router;
}