-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."Client" DROP CONSTRAINT "Client_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_clientId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
