/*
  Warnings:

  - You are about to drop the column `clientName` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - Added the required column `clientName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductsOnOrders" DROP COLUMN "clientName",
DROP COLUMN "number",
DROP COLUMN "status",
DROP COLUMN "total";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'received',
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
