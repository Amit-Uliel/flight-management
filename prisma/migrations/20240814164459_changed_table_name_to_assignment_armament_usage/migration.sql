/*
  Warnings:

  - You are about to drop the `AssignmentArmamentDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignmentArmamentDetail" DROP CONSTRAINT "AssignmentArmamentDetail_armamentType_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentArmamentDetail" DROP CONSTRAINT "AssignmentArmamentDetail_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentArmamentDetail" DROP CONSTRAINT "AssignmentArmamentDetail_tailNumber_fkey";

-- DropTable
DROP TABLE "AssignmentArmamentDetail";

-- CreateTable
CREATE TABLE "AssignmentArmamentUsage" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "armamentType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "AssignmentArmamentUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentArmamentUsage_assignmentId_tailNumber_armamentTyp_key" ON "AssignmentArmamentUsage"("assignmentId", "tailNumber", "armamentType");

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_tailNumber_fkey" FOREIGN KEY ("tailNumber") REFERENCES "Aircraft"("tailNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_armamentType_fkey" FOREIGN KEY ("armamentType") REFERENCES "Armament"("armamentType") ON DELETE RESTRICT ON UPDATE CASCADE;
