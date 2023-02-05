/*
  Warnings:

  - You are about to alter the column `value` on the `Grade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;
