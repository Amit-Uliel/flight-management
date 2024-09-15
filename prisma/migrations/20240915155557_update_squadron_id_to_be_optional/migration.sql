-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_squadronId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "squadronId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_squadronId_fkey" FOREIGN KEY ("squadronId") REFERENCES "Squadron"("squadronId") ON DELETE SET NULL ON UPDATE CASCADE;
