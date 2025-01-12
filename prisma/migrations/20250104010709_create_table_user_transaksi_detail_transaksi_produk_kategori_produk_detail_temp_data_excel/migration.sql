-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(200) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `isActive` ENUM('ACTIVE', 'NON_ACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `token` VARCHAR(100) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `midtransCode` VARCHAR(120) NOT NULL,
    `total` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `detailTransaksiId` INTEGER NOT NULL,

    UNIQUE INDEX `transaksi_detailTransaksiId_key`(`detailTransaksiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `detailTransaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah` INTEGER NOT NULL,
    `subTotal` INTEGER NOT NULL,
    `produkId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaProduk` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `kategoriId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaKategori` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `produkDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detailTransaksiId` INTEGER NOT NULL,
    `produkId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `temp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah` INTEGER NOT NULL,
    `subTotal` INTEGER NOT NULL,
    `produkId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `dataExcel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaFile` VARCHAR(100) NOT NULL,
    `excelLink` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_detailTransaksiId_fkey` FOREIGN KEY (`detailTransaksiId`) REFERENCES `detailTransaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produkDetail` ADD CONSTRAINT `produkDetail_detailTransaksiId_fkey` FOREIGN KEY (`detailTransaksiId`) REFERENCES `detailTransaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produkDetail` ADD CONSTRAINT `produkDetail_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `temp` ADD CONSTRAINT `temp_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
