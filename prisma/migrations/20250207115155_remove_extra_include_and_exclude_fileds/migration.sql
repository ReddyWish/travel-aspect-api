/*
  Warnings:

  - You are about to drop the column `excludes` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `includes` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "excludes",
DROP COLUMN "includes";
