/*
  Warnings:

  - You are about to drop the column `flightId` on the `Mission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[missionId]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `weight` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `missionId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_flightId_fkey";

-- DropIndex
DROP INDEX "Mission_flightId_key";

-- AlterTable
ALTER TABLE "Aircraft" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "status" "AssignmentStatus" NOT NULL DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "missionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mission" DROP COLUMN "flightId";

-- CreateIndex
CREATE UNIQUE INDEX "Flight_missionId_key" ON "Flight"("missionId");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("missionId") ON DELETE RESTRICT ON UPDATE CASCADE;
