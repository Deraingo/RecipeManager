import { PrismaClient, Cook_Book } from "@prisma/client";

export type CreateCookBookPayload = {
  userId: number,
  name: string,
  recipes: number[],
  collaborators: number[],
}

export class CookBookRepository {
  private db: PrismaClient
  private static instance: CookBookRepository

  constructor(db: PrismaClient) {
    this.db = db
  }

  static getInstance(db?: PrismaClient): CookBookRepository {
    if (!this.instance) {
      this.instance = new CookBookRepository(db!!);
    }
    return this.instance;
  }

  async createCookBook({ userId, name, recipes, collaborators }: CreateCookBookPayload) {
    const currentTimestamp = new Date();
    const cookBook = await this.db.cook_Book.create({
      data: {
        userId: userId,
        name: name,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        shared: false, // or true, depending on your logic
      }
    });
  
    for (const recipeId of recipes) {
      await this.db.recipe.update({
        where: { id: recipeId },
        data: {
          cookBooks: {
            connect: { id: cookBook.id },
          },
        },
      });
    }
  
    for (const collaboratorId of collaborators) {
      await this.db.sharedCookBook.create({
        data: {
          sharedWithUserId: collaboratorId,
          cookBookId: cookBook.id,
        },
      });
    }
  
    return cookBook;
  }

  async getCookBooksByUserId(userId: number): Promise<Cook_Book[]> {
    return this.db.cook_Book.findMany({
      where: {
          id: userId,
      },
    });
  }
}