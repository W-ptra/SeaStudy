/*
  Warnings:

  - Changed the type of `category` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "category" AS ENUM ('programming', 'design', 'business', 'marketing', 'music', 'cooking', 'photography', 'health', 'fitness', 'lifestyle', 'personalDevelopment', 'academics', 'language', 'testPrep', 'teaching', 'other');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "category",
ADD COLUMN     "category" "category" NOT NULL;
