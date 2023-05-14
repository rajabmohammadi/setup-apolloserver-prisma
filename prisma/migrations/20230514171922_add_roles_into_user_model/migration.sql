-- DropIndex
DROP INDEX `Book_authorId_fkey` ON `book`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roles` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
