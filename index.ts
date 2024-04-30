import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UsersRepository } from "./server/repositories/users_respository";
import { RecipeRepository } from "./server/repositories/recipe_repository";
import { buildRecipeController } from "./server/controllers/recipe_controller";
import {EditProfileController} from "./server/controllers/profile_controller"; 
import { ProfileRepository } from "./server/repositories/profile_repository";
import { CookBookRepository } from "./server/repositories/cookbook_repository";
import {buildCookBookController} from "./server/controllers/cookbook_controller";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });

const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const recipeRepository = RecipeRepository.getInstance(db);
const profileRepository = ProfileRepository.getInstance(db);
const cookBookRepository = CookBookRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/recipes", buildRecipeController(recipeRepository));
app.use("/users/:id", EditProfileController(profileRepository, upload));
app.use("/change_password", EditProfileController(profileRepository, upload));
app.use("/create_cook_book", buildCookBookController(cookBookRepository));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


