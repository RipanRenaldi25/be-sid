/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `authentications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authentications_token_key" ON "authentications"("token");
