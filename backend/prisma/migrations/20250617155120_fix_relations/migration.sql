-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installer" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Installer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "systemType" TEXT NOT NULL,
    "plannedCommission" TIMESTAMP(3) NOT NULL,
    "sitePlanAttached" BOOLEAN NOT NULL DEFAULT false,
    "dataSheetAttached" BOOLEAN NOT NULL DEFAULT false,
    "certificatesAttached" BOOLEAN NOT NULL DEFAULT false,
    "subscriberId" INTEGER NOT NULL,
    "operatorId" INTEGER NOT NULL,
    "installerId" INTEGER NOT NULL,
    "plantAddressId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_installerId_fkey" FOREIGN KEY ("installerId") REFERENCES "Installer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_plantAddressId_fkey" FOREIGN KEY ("plantAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
