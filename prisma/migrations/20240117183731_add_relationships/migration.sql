/*
  Warnings:

  - Added the required column `listaId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ListaTareas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "listaId" INTEGER NOT NULL,
    "description" TEXT,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "ListaTareas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createDate", "description", "id", "title") SELECT "createDate", "description", "id", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_ListaTareas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ListaTareas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListaTareas" ("id", "nombre") SELECT "id", "nombre" FROM "ListaTareas";
DROP TABLE "ListaTareas";
ALTER TABLE "new_ListaTareas" RENAME TO "ListaTareas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
