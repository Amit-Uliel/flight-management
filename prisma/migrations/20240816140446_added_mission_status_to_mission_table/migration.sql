/*
  Warnings:

  - You are about to drop the column `startTime` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `takeOffTime` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `cameraType` on table `Assignment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scheduledLandingTime` on table `Assignment` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MissonStatus" AS ENUM ('ONGOING', 'ONHOLD', 'COMPLETED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_cameraType_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "startTime",
ADD COLUMN     "takeOffTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "cameraType" SET NOT NULL,
ALTER COLUMN "scheduledLandingTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "MissonStatus" "MissonStatus" NOT NULL DEFAULT 'ONGOING',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_cameraType_fkey" FOREIGN KEY ("cameraType") REFERENCES "Camera"("cameraType") ON DELETE RESTRICT ON UPDATE CASCADE;
