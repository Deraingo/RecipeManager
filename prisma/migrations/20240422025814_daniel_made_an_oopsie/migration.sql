/*
  Warnings:

  - Changed the type of `prepTime` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cookingTime` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "prepTime",
ADD COLUMN     "prepTime" DOUBLE PRECISION NOT NULL,
DROP COLUMN "cookingTime",
ADD COLUMN     "cookingTime" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
