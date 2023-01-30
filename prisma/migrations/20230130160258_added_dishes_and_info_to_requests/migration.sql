/*
  Warnings:

  - You are about to drop the column `dish` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "dish";

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "info" TEXT;

-- CreateTable
CREATE TABLE "dishes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "eventId" TEXT,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
