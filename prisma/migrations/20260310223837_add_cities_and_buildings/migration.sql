-- CreateEnum
CREATE TYPE "CityType" AS ENUM ('CAPITAL', 'FORTRESS', 'FARM_SETTLEMENT', 'MINING_TOWN', 'MARKET_TOWN', 'RUINS');

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('FARM', 'MINE', 'MARKET', 'BARRACKS', 'WALL');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "iron" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,
    "ownerPlayerId" INTEGER,
    "type" "CityType" NOT NULL,
    "defense" INTEGER NOT NULL DEFAULT 0,
    "isCapital" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "type" "BuildingType" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityConnection" (
    "id" SERIAL NOT NULL,
    "fromCityId" INTEGER NOT NULL,
    "toCityId" INTEGER NOT NULL,

    CONSTRAINT "CityConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "City_matchId_idx" ON "City"("matchId");

-- CreateIndex
CREATE INDEX "City_ownerPlayerId_idx" ON "City"("ownerPlayerId");

-- CreateIndex
CREATE INDEX "Building_cityId_idx" ON "Building"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Building_cityId_type_key" ON "Building"("cityId", "type");

-- CreateIndex
CREATE INDEX "CityConnection_fromCityId_idx" ON "CityConnection"("fromCityId");

-- CreateIndex
CREATE INDEX "CityConnection_toCityId_idx" ON "CityConnection"("toCityId");

-- CreateIndex
CREATE UNIQUE INDEX "CityConnection_fromCityId_toCityId_key" ON "CityConnection"("fromCityId", "toCityId");

-- CreateIndex
CREATE INDEX "Player_userId_idx" ON "Player"("userId");

-- CreateIndex
CREATE INDEX "Player_matchId_idx" ON "Player"("matchId");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_ownerPlayerId_fkey" FOREIGN KEY ("ownerPlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityConnection" ADD CONSTRAINT "CityConnection_fromCityId_fkey" FOREIGN KEY ("fromCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityConnection" ADD CONSTRAINT "CityConnection_toCityId_fkey" FOREIGN KEY ("toCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
