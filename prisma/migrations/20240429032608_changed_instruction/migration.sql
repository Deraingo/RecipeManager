-- DropForeignKey
ALTER TABLE "Instructions" DROP CONSTRAINT "Instructions_cookBookId_fkey";

-- AlterTable
ALTER TABLE "Instructions" ALTER COLUMN "cookBookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
