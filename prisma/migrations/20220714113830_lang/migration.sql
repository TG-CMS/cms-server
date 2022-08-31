/*
  Warnings:

  - You are about to drop the `TranslateOrLang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TranslateOrLang` DROP FOREIGN KEY `TranslateOrLang_langId_fkey`;

-- DropForeignKey
ALTER TABLE `TranslateOrLang` DROP FOREIGN KEY `TranslateOrLang_translateId_fkey`;

-- DropTable
DROP TABLE `TranslateOrLang`;

-- CreateTable
CREATE TABLE `_TranslateOrLang` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TranslateOrLang_AB_unique`(`A`, `B`),
    INDEX `_TranslateOrLang_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TranslateOrLang` ADD CONSTRAINT `_TranslateOrLang_A_fkey` FOREIGN KEY (`A`) REFERENCES `Translate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TranslateOrLang` ADD CONSTRAINT `_TranslateOrLang_B_fkey` FOREIGN KEY (`B`) REFERENCES `TranslateLang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
