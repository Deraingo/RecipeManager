import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { CookBookRepository } from "../repositories/cookbook_repository";
export const buildCookBookController = (cookBookRepository: CookBookRepository) => {
    const router = Router();
  
    router.post("/", async (req, res) => {
      try {
        const cookBook = await cookBookRepository.createCookBook(req.body);
        res.json({ cookBook });
      } catch (error) {
        console.error("Error creating cookbook:", error);
        res.status(500).json({ error: "Failed to create cookbook", message: error });
      }
    });
  
    router.get("/me", authMiddleware, async (req, res) => {
      try {
        const userId = req.user?.id;
        if (userId === undefined) {
          res.status(400).json({ error: "User ID not provided in request" });
          return;
        }
  
        const cookBooks = await cookBookRepository.getCookBooksByUserId(userId);
        res.json({ cookBooks });
      } catch (error) {
        console.error("Error fetching user's cookbooks:", error);
        res.status(500).json({ error: "Failed to fetch user's cookbooks" });
      }
    });
  
    return router;
  }