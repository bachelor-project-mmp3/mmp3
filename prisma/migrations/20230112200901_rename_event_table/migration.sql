/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_authorId_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "info" TEXT,
    "authorId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeLimit" TIMESTAMP(3) NOT NULL,
    "dish" VARCHAR(100) NOT NULL,
    "costs" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "ingredients" TEXT,
    "image" TEXT NOT NULL,
    "currentParticipants" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
