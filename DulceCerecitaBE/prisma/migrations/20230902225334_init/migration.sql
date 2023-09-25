-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "id" SERIAL NOT NULL,
    "asunto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "personaId" INTEGER NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orden" (
    "id" SERIAL NOT NULL,
    "personaId" INTEGER NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "ordenId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineaOrden" (
    "id" SERIAL NOT NULL,
    "ordenId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LineaOrden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mensaje_personaId_key" ON "Mensaje"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Orden_personaId_key" ON "Orden"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_ordenId_key" ON "Venta"("ordenId");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_descripcion_key" ON "Producto"("descripcion");

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaOrden" ADD CONSTRAINT "LineaOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaOrden" ADD CONSTRAINT "LineaOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
