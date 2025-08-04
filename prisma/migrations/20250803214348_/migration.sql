-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateTable
CREATE TABLE "public"."Client" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "document" CHAR(14) NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" UUID NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(100),
    "neighborhood" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "country" CHAR(2) NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_document_key" ON "public"."Client"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "public"."Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_clientId_key" ON "public"."Address"("clientId");

-- AddForeignKey
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
