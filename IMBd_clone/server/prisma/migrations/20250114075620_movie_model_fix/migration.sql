/*
  Warnings:

  - You are about to drop the column `poster` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `poster_path` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "poster",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "release_date" TEXT NOT NULL;
