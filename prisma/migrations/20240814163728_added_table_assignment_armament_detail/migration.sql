/*
  Warnings:

  - You are about to drop the column `armamentType` on the `Aircraft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_armamentType_fkey";

-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "armamentType";

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "cameraType" TEXT;

-- CreateTable
CREATE TABLE "AssignmentArmamentDetail" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "armamentType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "AssignmentArmamentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentArmamentDetail_assignmentId_tailNumber_armamentTy_key" ON "AssignmentArmamentDetail"("assignmentId", "tailNumber", "armamentType");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_cameraType_fkey" FOREIGN KEY ("cameraType") REFERENCES "Camera"("cameraType") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentDetail" ADD CONSTRAINT "AssignmentArmamentDetail_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentDetail" ADD CONSTRAINT "AssignmentArmamentDetail_tailNumber_fkey" FOREIGN KEY ("tailNumber") REFERENCES "Aircraft"("tailNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentDetail" ADD CONSTRAINT "AssignmentArmamentDetail_armamentType_fkey" FOREIGN KEY ("armamentType") REFERENCES "Armament"("armamentType") ON DELETE RESTRICT ON UPDATE CASCADE;
