/*
  Warnings:

  - Added the required column `content` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGraded` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "isGraded" BOOLEAN NOT NULL,
ALTER COLUMN "score" SET DEFAULT 0;
