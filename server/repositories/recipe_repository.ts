import { PrismaClient, Recipe} from "@prisma/client";
import exp from "constants";
import { connect } from "http2";

export type CreateRecipePayload = {
  userId: number,
  name: string,
  prepTime: number,
  cookingTime: number,
  servings: number,
}

export type UpdateRecipePayload = {
    userId: number,
    name: string,
    prepTime: number,
    cookingTime: number,
    servings: number,
    created_at: Date,
}

//TODO: add ingredients and instructions

export class RecipeRepository {
    private db: PrismaClient
    private static instance: RecipeRepository
    constructor(db: PrismaClient){
        this.db = db
    }
    static getInstance(db?: PrismaClient): RecipeRepository {
        if (!this.instance) {
          this.instance = new RecipeRepository(db!!);
        }
        return this.instance;
    }
    async createRecipe({ userId, name, prepTime, cookingTime, servings }: CreateRecipePayload) {
        const currentTimestamp = new Date();
        return this.db.recipe.create({
          data: {
            user: { connect: { id: userId } },
            name: name,
            prepTime: prepTime,
            cookingTime: cookingTime,
            servings: servings,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          }
        });
    }
    async deleteRecipe(recipeId: number): Promise<void> {
        try {
          await this.db.recipe.delete({
            where: {
              id: recipeId,
            },
          });
        } catch (error) {
          // Handle errors (e.g., log error, throw custom error)
          console.error('Error deleting recipe:', error);
          throw new Error('Failed to delete recipe');
        }
    }
    async updateRecipe(recipeId: number, { userId, name, prepTime, cookingTime, servings, created_at }: UpdateRecipePayload) {
        const currentTimestamp = new Date();
        return this.db.recipe.update({
          where:{
            id: recipeId,
          },
          data: {
            user: { connect: { id: userId } },
            name: name,
            prepTime: prepTime,
            cookingTime: cookingTime,
            servings: servings,
            createdAt: created_at,
            updatedAt: currentTimestamp,
          }
        });
    }
    async getRecipesByUserId(userId: number): Promise<Recipe[]> {
        return this.db.recipe.findMany({
          where: {
            user: {
              id: userId,
            },
          },
        });
    }
}