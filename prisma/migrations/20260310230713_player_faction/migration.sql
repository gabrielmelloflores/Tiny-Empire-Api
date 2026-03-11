/*
  Warnings:

  - Added the required column `faction` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('HUMAN', 'DWARF', 'ELF', 'UNDEAD');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "faction" "Faction" NOT NULL;
