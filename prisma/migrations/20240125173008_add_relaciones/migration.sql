/*
  Warnings:

  - The primary key for the `Relaciones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserShared` on the `Relaciones` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Relaciones` table. All the data in the column will be lost.
  - You are about to drop the column `listaTarea` on the `Relaciones` table. All the data in the column will be lost.
  - Added the required column `listaId` to the `Relaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Relaciones` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relaciones" (
    "listaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("listaId", "userId"),
    CONSTRAINT "Relaciones_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "ListaTareas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relaciones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Relaciones";
ALTER TABLE "new_Relaciones" RENAME TO "Relaciones";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
