/*
  Warnings:

  - You are about to drop the column `cancelled` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `recipeLink` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "cancelled",
DROP COLUMN "ingredients",
DROP COLUMN "recipeLink",
ALTER COLUMN "currentParticipants" SET DEFAULT 0;
