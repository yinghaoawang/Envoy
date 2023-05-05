/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `DirectMessage` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `DirectMessage` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_toUserId_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "fromUserId",
DROP COLUMN "toUserId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DirectMessageChat" (
    "id" SERIAL NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DirectMessageChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DirectMessageChat" ADD CONSTRAINT "DirectMessageChat_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChat" ADD CONSTRAINT "DirectMessageChat_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "DirectMessageChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
