-- CreateTable
CREATE TABLE "_Cook_BookToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Cook_BookToRecipe_AB_unique" ON "_Cook_BookToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_Cook_BookToRecipe_B_index" ON "_Cook_BookToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_Cook_BookToRecipe" ADD CONSTRAINT "_Cook_BookToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cook_Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cook_BookToRecipe" ADD CONSTRAINT "_Cook_BookToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
