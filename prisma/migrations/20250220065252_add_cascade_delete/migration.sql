-- DropForeignKey
ALTER TABLE "TourAccommodation" DROP CONSTRAINT "TourAccommodation_tourId_fkey";

-- AddForeignKey
ALTER TABLE "TourAccommodation" ADD CONSTRAINT "TourAccommodation_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
