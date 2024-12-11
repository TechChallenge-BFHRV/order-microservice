-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STARTED', 'PENDING', 'APPROVED', 'IN_PROGRESS', 'READY', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Step" AS ENUM ('START', 'MEAL', 'DRINK', 'SIDE_DISH', 'DESERT', 'CHECKOUT', 'PAYMENT_REQUEST', 'COMPLETED');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "totalPrice" INTEGER,
    "finalPrice" INTEGER,
    "preparationTime" INTEGER,
    "status" "Status" NOT NULL,
    "step" "Step" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "InProgressTimestamp" TIMESTAMP(3),
    "customerId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
