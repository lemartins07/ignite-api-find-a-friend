/*
  Warnings:

  - Added the required column `path` to the `pet_pictures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet_pictures" ADD COLUMN     "path" TEXT NOT NULL;
