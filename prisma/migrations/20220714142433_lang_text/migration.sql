/*
  Warnings:

  - You are about to drop the column `textLangId` on the `TranslateLangText` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TranslateLangText` DROP COLUMN `textLangId`,
    ADD COLUMN `langId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TranslateLangText` ADD CONSTRAINT `TranslateLangText_langId_fkey` FOREIGN KEY (`langId`) REFERENCES `TranslateLang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
