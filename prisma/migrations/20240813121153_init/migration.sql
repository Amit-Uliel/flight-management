-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('SKY', 'LANDED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "squadronId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Squadron" (
    "squadronId" INTEGER NOT NULL,

    CONSTRAINT "Squadron_pkey" PRIMARY KEY ("squadronId")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "tailNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "squadronId" INTEGER NOT NULL,
    "armamentType" TEXT,
    "cameraType" TEXT,

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
    "flightId" INTEGER NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("missionId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "missionId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "flightId" SERIAL NOT NULL,
    "takeoffTime" TIMESTAMP(3) NOT NULL,
    "landingTime" TIMESTAMP(3) NOT NULL,
    "status" "FlightStatus" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("flightId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Mission_flightId_key" ON "Mission"("flightId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_tailNumber_missionId_key" ON "Assignment"("tailNumber", "missionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_armamentType_fkey" FOREIGN KEY ("armamentType") REFERENCES "Armament"("armamentType") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_cameraType_fkey" FOREIGN KEY ("cameraType") REFERENCES "Camera"("cameraType") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("flightId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_tailNumber_fkey" FOREIGN KEY ("tailNumber") REFERENCES "Aircraft"("tailNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("missionId") ON DELETE RESTRICT ON UPDATE CASCADE;
