/*
  Warnings:

  - You are about to drop the column `projectId` on the `Build` table. All the data in the column will be lost.
  - You are about to drop the column `children` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `scaffoldId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Widget` table. All the data in the column will be lost.
  - You are about to drop the column `dependence` on the `WidgetVersion` table. All the data in the column will be lost.
  - You are about to drop the `Scaffold` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[enName]` on the table `Widget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientType` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Widget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `WidgetVersion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Build` DROP FOREIGN KEY `Build_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `Page` DROP FOREIGN KEY `Page_scaffoldId_fkey`;

-- DropForeignKey
ALTER TABLE `Scaffold` DROP FOREIGN KEY `Scaffold_userId_fkey`;

-- AlterTable
ALTER TABLE `Build` DROP COLUMN `projectId`,
    ADD COLUMN `templateId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Page` DROP COLUMN `children`,
    DROP COLUMN `scaffoldId`,
    ADD COLUMN `clientType` VARCHAR(191) NOT NULL,
    ADD COLUMN `templateId` INTEGER NULL,
    ADD COLUMN `widget` JSON NULL;

-- AlterTable
ALTER TABLE `Widget` DROP COLUMN `thumbnail`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WidgetVersion` DROP COLUMN `dependence`,
    ADD COLUMN `dependencies` JSON NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Scaffold`;

-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `enName` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `thumbnailList` JSON NULL,
    `userId` INTEGER NULL,
    `meta` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Template_enName_key`(`enName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Widget_enName_key` ON `Widget`(`enName`);

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Build` ADD CONSTRAINT `Build_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
