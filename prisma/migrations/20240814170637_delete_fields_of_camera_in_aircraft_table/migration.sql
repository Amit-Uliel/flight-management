/*
  Warnings:

  - You are about to drop the column `cameraType` on the `Aircraft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_cameraType_fkey";

-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "cameraType";
