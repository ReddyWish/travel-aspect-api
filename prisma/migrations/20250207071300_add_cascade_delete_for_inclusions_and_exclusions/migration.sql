-- DropForeignKey
ALTER TABLE "TourExclusion" DROP CONSTRAINT "TourExclusion_tourId_fkey";

-- DropForeignKey
ALTER TABLE "TourInclusion" DROP CONSTRAINT "TourInclusion_tourId_fkey";

-- AddForeignKey
ALTER TABLE "TourInclusion" ADD CONSTRAINT "TourInclusion_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourExclusion" ADD CONSTRAINT "TourExclusion_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
