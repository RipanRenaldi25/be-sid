/*
  Warnings:

  - Added the required column `request_id` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Process" AS ENUM ('unprocessed', 'processed', 'completed');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "request_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "requests" (
    "request_id" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "processed" "Process" NOT NULL DEFAULT 'unprocessed',

    CONSTRAINT "requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "_RequestToUser" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RequestToUser_AB_unique" ON "_RequestToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestToUser_B_index" ON "_RequestToUser"("B");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToUser" ADD CONSTRAINT "_RequestToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "requests"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToUser" ADD CONSTRAINT "_RequestToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
