-- CreateEnum
CREATE TYPE "AircraftModel" AS ENUM ('HERMES_450', 'HERMES_900', 'HERMES_1000');

-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('SCHEDULED', 'IN_FLIGHT', 'LANDED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "MissonStatus" AS ENUM ('ONGOING', 'ONHOLD', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('TORAI', 'RAV_TORAI', 'SAMAL', 'SAMAL_RISHON', 'RAV_SAMAL', 'RAV_SAMAL_MITKADAM', 'RAV_SAMAL_BAKHIR', 'RAV_NAGAD_MISNE', 'RAV_NAGAD', 'SAGAN', 'SEREN', 'RAV_SEREN', 'SAGAN_ALUF', 'ALUF_MISHNE', 'TAT_ALUF', 'ALUF', 'RAV_ALUF');

-- CreateTable
CREATE TABLE "User" (
    "militaryId" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "squadronId" INTEGER,
    "rank" "Rank" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("militaryId")
);

-- CreateTable
CREATE TABLE "Squadron" (
    "squadronId" INTEGER NOT NULL,

    CONSTRAINT "Squadron_pkey" PRIMARY KEY ("squadronId")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "tailNumber" TEXT NOT NULL,
    "model" "AircraftModel" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "squadronId" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("tailNumber")
);

-- CreateTable
CREATE TABLE "Armament" (
    "armamentType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Armament_pkey" PRIMARY KEY ("armamentType")
);

-- CreateTable
CREATE TABLE "Camera" (
    "cameraType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("cameraType")
);

-- CreateTable
CREATE TABLE "Mission" (
    "missionId" SERIAL NOT NULL,
    "missionName" TEXT NOT NULL,
    "MissionStatus" "MissonStatus" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("missionId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignmentId" SERIAL NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "missionId" INTEGER NOT NULL,
    "takeOffTime" TIMESTAMP(3) NOT NULL,
    "scheduledLandingTime" TIMESTAMP(3) NOT NULL,
    "actualLandingTime" TIMESTAMP(3),
    "cameraType" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateTable
CREATE TABLE "AssignmentArmamentUsage" (
    "assignmentArmamentUsageId" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "armamentType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "AssignmentArmamentUsage_pkey" PRIMARY KEY ("assignmentArmamentUsageId")
);

-- CreateTable
CREATE TABLE "Flight" (
    "flightId" SERIAL NOT NULL,
    "takeoffTime" TIMESTAMP(3) NOT NULL,
    "scheduledLandingTime" TIMESTAMP(3) NOT NULL,
    "actualLandingTime" TIMESTAMP(3),
    "status" "FlightStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT NOT NULL,
    "missionId" INTEGER NOT NULL,
    "squadronId" INTEGER NOT NULL,
    "militaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("flightId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_militaryId_key" ON "User"("militaryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_tailNumber_missionId_key" ON "Assignment"("tailNumber", "missionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentArmamentUsage_assignmentId_tailNumber_armamentTyp_key" ON "AssignmentArmamentUsage"("assignmentId", "tailNumber", "armamentType");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_tailNumber_fkey" FOREIGN KEY ("tailNumber") REFERENCES "Aircraft"("tailNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("missionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_cameraType_fkey" FOREIGN KEY ("cameraType") REFERENCES "Camera"("cameraType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("assignmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_tailNumber_fkey" FOREIGN KEY ("tailNumber") REFERENCES "Aircraft"("tailNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentArmamentUsage" ADD CONSTRAINT "AssignmentArmamentUsage_armamentType_fkey" FOREIGN KEY ("armamentType") REFERENCES "Armament"("armamentType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("missionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_militaryId_fkey" FOREIGN KEY ("militaryId") REFERENCES "User"("militaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
