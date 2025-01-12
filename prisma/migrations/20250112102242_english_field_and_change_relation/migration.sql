/*
  Warnings:

  - You are about to drop the column `total_product` on the `temps` table. All the data in the column will be lost.
  - You are about to drop the column `product_total` on the `transaction_details` table. All the data in the column will be lost.
  - You are about to drop the column `midtrans_code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_detail_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `product_details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `temps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `transaction_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `transaction_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_code` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_details` DROP FOREIGN KEY `product_details_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_details` DROP FOREIGN KEY `product_details_transaction_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_transaction_detail_id_fkey`;

-- DropIndex
DROP INDEX `transactions_transaction_detail_id_key` ON `transactions`;

-- AlterTable
ALTER TABLE `temps` DROP COLUMN `total_product`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction_details` DROP COLUMN `product_total`,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `transaction_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `midtrans_code`,
    DROP COLUMN `transaction_detail_id`,
    ADD COLUMN `status` VARCHAR(25) NOT NULL,
    ADD COLUMN `transaction_code` VARCHAR(120) NOT NULL,
    ADD COLUMN `transaction_method` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'CASH';

-- DropTable
DROP TABLE `product_details`;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
