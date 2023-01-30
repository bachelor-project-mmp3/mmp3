-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'OVER', 'CANCELLED');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING';
