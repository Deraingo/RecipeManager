-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_cookBookId_fkey";

-- AlterTable
ALTER TABLE "Ingredients" ALTER COLUMN "cookBookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
