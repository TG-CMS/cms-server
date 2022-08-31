/*
  Warnings:

  - You are about to drop the `TranslateText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TranslateText` DROP FOREIGN KEY `TranslateText_spaceId_fkey`;

-- DropTable
DROP TABLE `TranslateText`;

-- CreateTable
CREATE TABLE `TranslateSourceText` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spaceId` INTEGER NULL,
    `key` VARCHAR(191) NULL,
    `sourceText` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranslateLangText` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spaceId` INTEGER NULL,
    `sourceTextId` INTEGER NOT NULL,
    `textLangId` INTEGER NOT NULL,
    `translateText` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TranslateSourceText` ADD CONSTRAINT `TranslateSourceText_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `TranslateSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateLangText` ADD CONSTRAINT `TranslateLangText_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `TranslateSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateLangText` ADD CONSTRAINT `TranslateLangText_sourceTextId_fkey` FOREIGN KEY (`sourceTextId`) REFERENCES `TranslateSourceText`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
