/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `DirectMessageChat` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `DirectMessageChat` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersOnDirectMessageChatsDirectMessageChatId` to the `DirectMessageChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersOnDirectMessageChatsUserId` to the `DirectMessageChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DirectMessageChat" DROP CONSTRAINT "DirectMessageChat_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessageChat" DROP CONSTRAINT "DirectMessageChat_toUserId_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DirectMessageChat" DROP COLUMN "fromUserId",
DROP COLUMN "toUserId",
ADD COLUMN     "usersOnDirectMessageChatsDirectMessageChatId" INTEGER NOT NULL,
ADD COLUMN     "usersOnDirectMessageChatsUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UsersOnDirectMessageChats" (
    "userId" INTEGER NOT NULL,
    "directMessageChatId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnDirectMessageChats_pkey" PRIMARY KEY ("userId","directMessageChatId")
);

-- AddForeignKey
ALTER TABLE "UsersOnDirectMessageChats" ADD CONSTRAINT "UsersOnDirectMessageChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnDirectMessageChats" ADD CONSTRAINT "UsersOnDirectMessageChats_directMessageChatId_fkey" FOREIGN KEY ("directMessageChatId") REFERENCES "DirectMessageChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
