/*
  Warnings:

  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `livingType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `uptown` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "recipeLink" TEXT;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "city",
DROP COLUMN "livingType",
DROP COLUMN "street",
DROP COLUMN "uptown",
DROP COLUMN "zip",
ALTER COLUMN "email" SET NOT NULL;

-- DropEnum
DROP TYPE "LivingType";
