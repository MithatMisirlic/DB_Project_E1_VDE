/*
  Warnings:

  - You are about to drop the column `email` on the `Installer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Installer` table. All the data in the column will be lost.
  - Added the required column `company` to the `Installer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Installer" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "company" TEXT NOT NULL;
