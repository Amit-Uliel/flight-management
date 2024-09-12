/*
  Warnings:

  - Added the required column `militaryId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "militaryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_militaryId_fkey" FOREIGN KEY ("militaryId") REFERENCES "User"("militaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
