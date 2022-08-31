/*
  Warnings:

  - You are about to drop the `CommonType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnail` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TranslateSourceText` ADD COLUMN `maxLength` INTEGER NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Widget` ADD COLUMN `onlineTime` DATETIME(3) NULL,
    ADD COLUMN `readonly` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `CommonType`;

-- CreateTable
CREATE TABLE `ImageCategorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
