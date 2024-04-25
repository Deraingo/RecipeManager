/*
  Warnings:

  - Added the required column `userId` to the `Cook_Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cook_Book" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cook_Book" ADD CONSTRAINT "Cook_Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
