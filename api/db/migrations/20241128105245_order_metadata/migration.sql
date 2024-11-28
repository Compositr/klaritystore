/*
  Warnings:

  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingFirst` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLast` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "shippingAddressLine2" TEXT,
ADD COLUMN     "shippingFirst" TEXT NOT NULL,
ADD COLUMN     "shippingLast" TEXT NOT NULL;
