-- DropForeignKey
ALTER TABLE "Assigment" DROP CONSTRAINT "Assigment_topicId_fkey";

-- AddForeignKey
ALTER TABLE "Assigment" ADD CONSTRAINT "Assigment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
