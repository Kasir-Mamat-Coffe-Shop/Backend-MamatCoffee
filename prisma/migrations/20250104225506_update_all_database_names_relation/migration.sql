/*
  Warnings:

  - You are about to drop the column `alamat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `dataexcel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detailtransaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produkdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaksi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_kategoriId_fkey`;

-- DropForeignKey
ALTER TABLE `produkdetail` DROP FOREIGN KEY `produkDetail_detailTransaksiId_fkey`;

-- DropForeignKey
ALTER TABLE `produkdetail` DROP FOREIGN KEY `produkDetail_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `temp` DROP FOREIGN KEY `temp_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_detailTransaksiId_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_email_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `alamat`,
    DROP COLUMN `isActive`,
    DROP COLUMN `nama`,
    ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `is_active` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    MODIFY `image` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `dataexcel`;

-- DropTable
DROP TABLE `detailtransaksi`;

-- DropTable
DROP TABLE `kategori`;

-- DropTable
DROP TABLE `produk`;

-- DropTable
DROP TABLE `produkdetail`;

-- DropTable
DROP TABLE `temp`;

-- DropTable
DROP TABLE `transaksi`;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `midtrans_code` VARCHAR(120) NOT NULL,
    `total` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `transaction_detail_id` INTEGER NOT NULL,

    UNIQUE INDEX `transactions_transaction_detail_id_key`(`transaction_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_total` INTEGER NOT NULL,
    `sub_total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `product_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_detail_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `temps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_product` INTEGER NOT NULL,
    `sub_total` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `excel_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(100) NOT NULL,
    `excel_link` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_transaction_detail_id_fkey` FOREIGN KEY (`transaction_detail_id`) REFERENCES `transaction_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_details` ADD CONSTRAINT `product_details_transaction_detail_id_fkey` FOREIGN KEY (`transaction_detail_id`) REFERENCES `transaction_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_details` ADD CONSTRAINT `product_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `temps` ADD CONSTRAINT `temps_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
