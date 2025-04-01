/*
  Warnings:

  - You are about to drop the column `page` on the `PageResponseTimes` table. All the data in the column will be lost.
  - You are about to drop the column `page` on the `PageViews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,pageName,deviceType,channel]` on the table `PageViews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageName` to the `PageResponseTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageName` to the `PageViews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PageViews_page_userId_deviceType_channel_key";

-- AlterTable
ALTER TABLE "PageResponseTimes" DROP COLUMN "page",
ADD COLUMN     "pageName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PageViews" DROP COLUMN "page",
ADD COLUMN     "pageName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OutputRepetitions" (
    "id" SERIAL NOT NULL,
    "output_id" INTEGER NOT NULL,
    "output_name" TEXT NOT NULL DEFAULT '',
    "count" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutputRepetitions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OutputRepetitions_output_id_key" ON "OutputRepetitions"("output_id");

-- CreateIndex
CREATE INDEX "OutputRepetitions_output_id_updated_at_idx" ON "OutputRepetitions"("output_id", "updated_at");

-- CreateIndex
CREATE INDEX "Admin_id_idx" ON "Admin"("id");

-- CreateIndex
CREATE INDEX "GameMetrics_userId_createdAt_idx" ON "GameMetrics"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PageResponseTimes_pageName_userId_idx" ON "PageResponseTimes"("pageName", "userId");

-- CreateIndex
CREATE INDEX "PageViews_pageName_userId_idx" ON "PageViews"("pageName", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PageViews_userId_pageName_deviceType_channel_key" ON "PageViews"("userId", "pageName", "deviceType", "channel");

-- CreateIndex
CREATE INDEX "QuestionResponses_userId_questionId_idx" ON "QuestionResponses"("userId", "questionId");
