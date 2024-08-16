/*
  Warnings:

  - You are about to drop the column `endTime` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `landingTime` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `scheduledLandingTime` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "endTime",
ADD COLUMN     "actualLandingTime" TIMESTAMP(3),
ADD COLUMN     "scheduledLandingTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "landingTime",
ADD COLUMN     "actualLandingTime" TIMESTAMP(3),
ADD COLUMN     "scheduledLandingTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
