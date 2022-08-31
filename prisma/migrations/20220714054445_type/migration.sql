/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TypeToWidget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategorieOnWidget` DROP FOREIGN KEY `CategorieOnWidget_categorieId_fkey`;

-- DropForeignKey
ALTER TABLE `Type` DROP FOREIGN KEY `Type_type_fkey`;

-- DropForeignKey
ALTER TABLE `_TypeToWidget` DROP FOREIGN KEY `_TypeToWidget_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TypeToWidget` DROP FOREIGN KEY `_TypeToWidget_B_fkey`;

-- DropTable
DROP TABLE `Type`;

-- DropTable
DROP TABLE `_TypeToWidget`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categorieId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `group` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataSource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `enName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `prodOrigin` VARCHAR(191) NULL,
    `preOrigin` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `method` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `params` JSON NULL,
    `headers` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `ext` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `mime_type` VARCHAR(191) NULL,
    `imageName` VARCHAR(191) NULL,
    `size` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToWidget` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToWidget_AB_unique`(`A`, `B`),
    INDEX `_TagToWidget_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieOnWidget` ADD CONSTRAINT `CategorieOnWidget_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToWidget` ADD CONSTRAINT `_TagToWidget_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToWidget` ADD CONSTRAINT `_TagToWidget_B_fkey` FOREIGN KEY (`B`) REFERENCES `Widget`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
