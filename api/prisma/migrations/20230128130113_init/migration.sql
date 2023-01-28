/*
  Warnings:

  - Added the required column `teacherUuid` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "teacherUuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherUuid_fkey" FOREIGN KEY ("teacherUuid") REFERENCES "Teacher"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
