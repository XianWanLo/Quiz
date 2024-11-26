/*
  Warnings:

  - A unique constraint covering the columns `[output_id]` on the table `OutputRepetitions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OutputRepetitions_output_id_key" ON "OutputRepetitions"("output_id");
