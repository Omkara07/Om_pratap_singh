/*
  Warnings:

  - Changed the type of `dob` on the `Actor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `release_date` on the `Movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dob` on the `Producer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "release_date",
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
