import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  router.get("", async (req, res) => {
    const email = req.query.email;
    console.log(`Email parameter: ${email}`);
    if (typeof email !== 'string') {
      return res.status(400).json({ error: "Email query parameter must be a string" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email query parameter is required" });
    }
    try {
      const user = await usersRepository.getUserByEmail(email);
      return res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: "User not found" });
    }
  });

  return router;
}

