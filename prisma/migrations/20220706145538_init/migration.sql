-- CreateTable
CREATE TABLE `Dict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `sort` INTEGER NULL,
    `status` INTEGER NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DictValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `value` JSON NULL,
    `sort` INTEGER NULL,
    `status` INTEGER NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `DictValue_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `type` INTEGER NOT NULL,
    `isShow` INTEGER NOT NULL,
    `isLink` INTEGER NOT NULL,
    `icon` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `component` VARCHAR(191) NULL,
    `permission` VARCHAR(191) NULL,
    `sort` INTEGER NOT NULL,
    `parentId` INTEGER NULL,
    `status` INTEGER NOT NULL,
    `isKeepAlive` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleMenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NULL,
    `menuId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `sex` INTEGER NULL,
    `isActive` INTEGER NULL,
    `email` VARCHAR(191) NULL,
    `info` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `isErp` BOOLEAN NOT NULL DEFAULT false,
    `regTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Widget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enName` VARCHAR(191) NOT NULL,
    `online` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WidgetVersion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `widgetId` INTEGER NULL,
    `version` VARCHAR(191) NOT NULL,
    `previewLink` VARCHAR(191) NULL,
    `assets` JSON NULL,
    `dependence` JSON NULL,
    `schema` JSON NULL,
    `mock` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategorieOnWidget` (
    `categorieId` INTEGER NOT NULL,
    `widgetId` INTEGER NOT NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`categorieId`, `widgetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scaffold` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `enName` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `userId` INTEGER NULL,
    `meta` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Scaffold_enName_key`(`enName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `enName` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `css` VARCHAR(191) NULL,
    `dataSource` JSON NULL,
    `meta` JSON NULL,
    `root` BOOLEAN NOT NULL DEFAULT false,
    `children` JSON NULL,
    `userId` INTEGER NULL,
    `scaffoldId` INTEGER NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Page_enName_key`(`enName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Build` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobLog` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL DEFAULT 0,
    `downloadLink` VARCHAR(191) NULL,
    `previewLink` VARCHAR(191) NULL,
    `projectId` INTEGER NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `endTime` DATETIME(3) NULL,
    `sTime` DATETIME(3) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Release` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buildId` INTEGER NOT NULL,
    `env` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `version` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Translate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `sourceLangId` INTEGER NOT NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranslateOrLang` (
    `translateId` INTEGER NOT NULL,
    `langId` INTEGER NOT NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`translateId`, `langId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranslateLang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `lang` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranslateSpace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `translateId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranslateText` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spaceId` INTEGER NULL,
    `key` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `translate` JSON NULL,
    `cTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TypeToWidget` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TypeToWidget_AB_unique`(`A`, `B`),
    INDEX `_TypeToWidget_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenu` ADD CONSTRAINT `RoleMenu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleMenu` ADD CONSTRAINT `RoleMenu_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Type` ADD CONSTRAINT `Type_type_fkey` FOREIGN KEY (`type`) REFERENCES `Categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WidgetVersion` ADD CONSTRAINT `WidgetVersion_widgetId_fkey` FOREIGN KEY (`widgetId`) REFERENCES `Widget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieOnWidget` ADD CONSTRAINT `CategorieOnWidget_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieOnWidget` ADD CONSTRAINT `CategorieOnWidget_widgetId_fkey` FOREIGN KEY (`widgetId`) REFERENCES `Widget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scaffold` ADD CONSTRAINT `Scaffold_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_scaffoldId_fkey` FOREIGN KEY (`scaffoldId`) REFERENCES `Scaffold`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Build` ADD CONSTRAINT `Build_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Scaffold`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Translate` ADD CONSTRAINT `Translate_sourceLangId_fkey` FOREIGN KEY (`sourceLangId`) REFERENCES `TranslateLang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateOrLang` ADD CONSTRAINT `TranslateOrLang_translateId_fkey` FOREIGN KEY (`translateId`) REFERENCES `Translate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateOrLang` ADD CONSTRAINT `TranslateOrLang_langId_fkey` FOREIGN KEY (`langId`) REFERENCES `TranslateLang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateSpace` ADD CONSTRAINT `TranslateSpace_translateId_fkey` FOREIGN KEY (`translateId`) REFERENCES `Translate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslateText` ADD CONSTRAINT `TranslateText_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `TranslateSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TypeToWidget` ADD CONSTRAINT `_TypeToWidget_A_fkey` FOREIGN KEY (`A`) REFERENCES `Type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TypeToWidget` ADD CONSTRAINT `_TypeToWidget_B_fkey` FOREIGN KEY (`B`) REFERENCES `Widget`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
