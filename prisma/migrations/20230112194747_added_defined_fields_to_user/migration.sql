/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uptown` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LivingType" AS ENUM ('PRIVATE', 'DORMITORY');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "city" VARCHAR(50) NOT NULL,
ADD COLUMN     "dormitory" VARCHAR(100),
ADD COLUMN     "firstName" VARCHAR(50) NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "instagram" VARCHAR(50),
ADD COLUMN     "interests" TEXT,
ADD COLUMN     "lastName" VARCHAR(50) NOT NULL,
ADD COLUMN     "livingType" "LivingType" NOT NULL DEFAULT 'DORMITORY',
ADD COLUMN     "phone" VARCHAR(15),
ADD COLUMN     "roomNumber" VARCHAR(10),
ADD COLUMN     "street" VARCHAR(100),
ADD COLUMN     "study" VARCHAR(100) NOT NULL,
ADD COLUMN     "uptown" VARCHAR(50) NOT NULL,
ADD COLUMN     "zip" INTEGER;
