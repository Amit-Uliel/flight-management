/*
  Warnings:

  - Changed the type of `model` on the `Aircraft` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AircraftModel" AS ENUM ('HERMES_450', 'HERMES_900', 'HERMES_1000');

-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "model",
ADD COLUMN     "model" "AircraftModel" NOT NULL;
