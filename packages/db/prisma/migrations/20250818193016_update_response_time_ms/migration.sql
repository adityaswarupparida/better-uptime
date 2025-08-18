/*
  Warnings:

  - Changed the type of `response_time_ms` on the `website_tick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "website_tick" DROP COLUMN "response_time_ms",
ADD COLUMN     "response_time_ms" INTEGER NOT NULL;
