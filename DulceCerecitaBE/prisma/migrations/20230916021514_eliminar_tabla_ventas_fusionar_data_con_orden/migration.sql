/*
  Warnings:

  - You are about to drop the `Venta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_ordenId_fkey";

-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Venta";
