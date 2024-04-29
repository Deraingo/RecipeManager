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
      console.log(cookBook);
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

  router.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const cookBook = await cookBookRepository.getCookBookById(id);
      res.json({ cookBook });
      console.log(cookBook);
    } catch (error) {
      console.error("Error fetching cookbook:", error);
      res.status(500).json({ error: "Failed to fetch cookbook" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const cookBook = await cookBookRepository.getCookBookById(id);
      await cookBookRepository.deleteCookBook(id);
      res.json({ message: "Cookbook deleted successfully" });
      console.log("deleted " + cookBook?.name);
    } catch (error) {
      console.error("Error deleting cookbook:", error);
      res.status(500).json({ error: "Failed to delete cookbook" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, recipes } = req.body;
        const cookBook = await cookBookRepository.editCookBook(id, name, recipes);
        res.json({ cookBook });
    } catch (error) {
        console.error("Error updating cookbook:", error);
        res.status(500).json({ error: "Failed to update cookbook" });
    }
});

  return router;
}