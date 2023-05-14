/*
  Warnings:

  - You are about to drop the column `author` on the `book` table. All the data in the column will be lost.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `author`,
    ADD COLUMN `authorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
