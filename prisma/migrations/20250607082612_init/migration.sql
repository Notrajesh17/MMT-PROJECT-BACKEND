-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "businessOwnerName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "contact1Phone" TEXT NOT NULL,
    "contact1Email" TEXT NOT NULL,
    "contact1Landline" TEXT,
    "contact2Phone" TEXT,
    "contact2Email" TEXT,
    "contact2Landline" TEXT,
    "locationLocality" TEXT NOT NULL,
    "locationStreet" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "locationCountry" TEXT NOT NULL,
    "locationPincode" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertyRelationship" TEXT NOT NULL,
    "onLease" BOOLEAN NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "registerOnOTAs" BOOLEAN NOT NULL,
    "commissionPercentToOTAs" DOUBLE PRECISION,
    "uploadIntroVideoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyRoom" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomTypeName" TEXT NOT NULL,
    "floorNumber" INTEGER NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "roomType" TEXT NOT NULL,
    "bedType" TEXT NOT NULL,
    "roomView" TEXT NOT NULL,
    "smokingAllowed" BOOLEAN NOT NULL,
    "extraBedAllowed" BOOLEAN NOT NULL,
    "amenities" TEXT[],
    "baseAdult" INTEGER NOT NULL,
    "maxAdult" INTEGER NOT NULL,
    "maxChildren" INTEGER NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,
    "baseRate" DOUBLE PRECISION NOT NULL,
    "extraAdultCharge" DOUBLE PRECISION NOT NULL,
    "childCharge" DOUBLE PRECISION NOT NULL,
    "availabilityStart" TIMESTAMP(3) NOT NULL,
    "availabilityEnd" TIMESTAMP(3) NOT NULL,
    "totalRoomsInProperty" INTEGER NOT NULL,
    "uploadRoomImageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connectivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelManagerUsed" BOOLEAN NOT NULL,
    "connectedWithTravelAgency" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connectivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyUSP" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ageOfProperty" INTEGER NOT NULL,
    "historicalEventAvailable" BOOLEAN NOT NULL,
    "historicalEventDesc" TEXT,
    "propertyOwnerDescription" TEXT NOT NULL,
    "nearbyPlaces" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyUSP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mandatory" TEXT[],
    "basicFacilities" TEXT[],
    "generalServices" TEXT[],
    "outdoorActivities" TEXT[],
    "commonAreas" TEXT[],
    "foodAndDrink" TEXT[],
    "healthWellness" TEXT[],
    "businessCenter" TEXT[],
    "beautyAndSpa" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MandatoryAmenities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "airConditioning" BOOLEAN NOT NULL,
    "laundry" BOOLEAN NOT NULL,
    "newspaper" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "roomService" BOOLEAN NOT NULL,
    "smokeDetector" BOOLEAN NOT NULL,
    "smokingRooms" BOOLEAN NOT NULL,
    "swimmingPools" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "lounge" BOOLEAN NOT NULL,
    "reception" BOOLEAN NOT NULL,
    "bar" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MandatoryAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyRules" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coupleRule" TEXT NOT NULL,
    "guestRule" TEXT NOT NULL,
    "identityRule" TEXT NOT NULL,
    "petRule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyInfo_userId_key" ON "PropertyInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Connectivity_userId_key" ON "Connectivity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyUSP_userId_key" ON "PropertyUSP"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_userId_key" ON "Amenities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MandatoryAmenities_userId_key" ON "MandatoryAmenities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyRules_userId_key" ON "PropertyRules"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStatus_userId_key" ON "PropertyStatus"("userId");

-- AddForeignKey
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyRoom" ADD CONSTRAINT "PropertyRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connectivity" ADD CONSTRAINT "Connectivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyUSP" ADD CONSTRAINT "PropertyUSP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MandatoryAmenities" ADD CONSTRAINT "MandatoryAmenities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyRules" ADD CONSTRAINT "PropertyRules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyStatus" ADD CONSTRAINT "PropertyStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
