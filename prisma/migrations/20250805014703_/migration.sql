-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_clientId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
