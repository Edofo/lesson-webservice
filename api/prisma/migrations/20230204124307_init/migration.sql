-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacherUuid_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "teacherUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherUuid_fkey" FOREIGN KEY ("teacherUuid") REFERENCES "Teacher"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
