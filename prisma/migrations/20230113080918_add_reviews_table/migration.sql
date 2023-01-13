-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "dish" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "text" TEXT,
    "userId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
