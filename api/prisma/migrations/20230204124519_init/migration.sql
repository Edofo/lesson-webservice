-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherUuid_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "teacherUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherUuid_fkey" FOREIGN KEY ("teacherUuid") REFERENCES "Teacher"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
