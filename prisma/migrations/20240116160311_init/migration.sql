-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ListaTareas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Relaciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listaTarea" TEXT NOT NULL,
    "UserShared" TEXT NOT NULL
);
