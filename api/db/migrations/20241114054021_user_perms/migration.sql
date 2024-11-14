-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Administrator', 'Customer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "Permission"[] DEFAULT ARRAY['Customer']::"Permission"[];
