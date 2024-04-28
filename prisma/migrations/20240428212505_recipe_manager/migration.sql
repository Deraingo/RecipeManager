/*
  Warnings:

  - You are about to drop the `Recipe_Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cookBookId` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientId` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_cookBookId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe_Ingredients" DROP CONSTRAINT "Recipe_Ingredients_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredients" ADD COLUMN     "cookBookId" INTEGER NOT NULL,
ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Recipe_Ingredients";

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
