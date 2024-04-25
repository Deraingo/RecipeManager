/*
  Warnings:

  - Added the required column `cookBookId` to the `Instructions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookBookId` to the `Recipe_Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instructions" ADD COLUMN     "cookBookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe_Ingredients" ADD COLUMN     "cookBookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe_Ingredients" ADD CONSTRAINT "Recipe_Ingredients_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
