/*
  Warnings:

  - You are about to drop the column `usersOnDirectMessageChatsDirectMessageChatId` on the `DirectMessageChat` table. All the data in the column will be lost.
  - You are about to drop the column `usersOnDirectMessageChatsUserId` on the `DirectMessageChat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DirectMessageChat" DROP COLUMN "usersOnDirectMessageChatsDirectMessageChatId",
DROP COLUMN "usersOnDirectMessageChatsUserId";
