/*
  Warnings:

  - You are about to drop the column `status` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - Added the required column `squadronId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "squadronId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImage",
ALTER COLUMN "rank" DROP DEFAULT;

-- DropEnum
DROP TYPE "AssignmentStatus";

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE RESTRICT ON UPDATE CASCADE;
