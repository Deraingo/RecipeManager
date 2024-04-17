-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cookingTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_Ingredients" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "Recipe_Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cook_Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shared" BOOLEAN NOT NULL,

    CONSTRAINT "Cook_Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedCookBook" (
    "id" SERIAL NOT NULL,
    "sharedWithUserId" INTEGER NOT NULL,
    "cookBookId" INTEGER NOT NULL,

    CONSTRAINT "SharedCookBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ingredients" ADD CONSTRAINT "Recipe_Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ingredients" ADD CONSTRAINT "Recipe_Ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedCookBook" ADD CONSTRAINT "SharedCookBook_sharedWithUserId_fkey" FOREIGN KEY ("sharedWithUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedCookBook" ADD CONSTRAINT "SharedCookBook_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "Cook_Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
