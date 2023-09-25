/*
  Warnings:

  - You are about to drop the column `cantidad` on the `LineaOrden` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `LineaOrden` table. All the data in the column will be lost.
  - You are about to drop the column `montoTotal` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Producto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `precio` to the `LineaOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `LineaOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioTotal` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefono` on table `Persona` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoria` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sabor` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topping` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Producto_descripcion_key";

-- AlterTable
ALTER TABLE "LineaOrden" DROP COLUMN "cantidad",
DROP COLUMN "subtotal",
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "montoTotal",
ADD COLUMN     "precioTotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "direccion",
ADD COLUMN     "dni" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "usuario" TEXT,
ALTER COLUMN "telefono" SET NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "descripcion",
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "sabor" TEXT NOT NULL,
ADD COLUMN     "topping" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");
