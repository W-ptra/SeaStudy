/*
  Warnings:

  - The values [ppr] on the enum `materialType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[topicId,userId]` on the table `Completion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "materialType_new" AS ENUM ('document', 'video', 'ppt');
ALTER TABLE "Material" ALTER COLUMN "type" TYPE "materialType_new" USING ("type"::text::"materialType_new");
ALTER TYPE "materialType" RENAME TO "materialType_old";
ALTER TYPE "materialType_new" RENAME TO "materialType";
DROP TYPE "materialType_old";
COMMIT;

-- DropIndex
DROP INDEX "Completion_topicId_key";

-- DropIndex
DROP INDEX "Completion_userId_key";

-- DropIndex
DROP INDEX "Course_userId_key";

-- DropIndex
DROP INDEX "Enrollment_courseId_key";

-- DropIndex
DROP INDEX "Enrollment_userId_key";

-- DropIndex
DROP INDEX "Material_topicId_key";

-- DropIndex
DROP INDEX "Post_courseId_key";

-- DropIndex
DROP INDEX "Post_userId_key";

-- DropIndex
DROP INDEX "Review_courseId_key";

-- DropIndex
DROP INDEX "Review_userId_key";

-- DropIndex
DROP INDEX "Topic_courseId_key";

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Material_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Completion_topicId_userId_key" ON "Completion"("topicId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_courseId_key" ON "Review"("userId", "courseId");
