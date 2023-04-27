-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "userFromId" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
