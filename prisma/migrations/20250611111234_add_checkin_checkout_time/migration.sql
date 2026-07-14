/*
  Warnings:

  - You are about to drop the column `identityRule` on the `PropertyRules` table. All the data in the column will be lost.
  - Added the required column `checkInTime` to the `PropertyRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOutTime` to the `PropertyRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherRule` to the `PropertyRules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connectivity" ADD COLUMN     "channelManagerName" TEXT,
ADD COLUMN     "travelAgencyName" TEXT;

-- AlterTable
ALTER TABLE "PropertyRules" DROP COLUMN "identityRule",
ADD COLUMN     "checkInTime" TEXT NOT NULL,
ADD COLUMN     "checkOutTime" TEXT NOT NULL,
ADD COLUMN     "otherRule" TEXT NOT NULL;
