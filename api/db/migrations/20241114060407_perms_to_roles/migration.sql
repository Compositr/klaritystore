/*
  Warnings:

  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Administrator', 'Manager', 'Employee', 'Customer');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions",
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['Customer']::"Role"[];

-- DropEnum
DROP TYPE "Permission";
