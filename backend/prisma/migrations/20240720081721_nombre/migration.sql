-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "shareId" TEXT NOT NULL,
    CONSTRAINT "File_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "Share" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "id", "name", "shareId", "size", "status") SELECT "createdAt", "id", "name", "shareId", "size", "status" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE TABLE "new_Share" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referencia" TEXT NOT NULL DEFAULT '',
    "allowDownload" BOOLEAN NOT NULL DEFAULT true,
    "showEstado" BOOLEAN NOT NULL DEFAULT true,
    "uploadLocked" BOOLEAN NOT NULL DEFAULT false,
    "isZipReady" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "expiration" DATETIME NOT NULL,
    "description" TEXT,
    "removedReason" TEXT,
    "creatorId" TEXT,
    "reverseShareId" TEXT,
    CONSTRAINT "Share_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Share_reverseShareId_fkey" FOREIGN KEY ("reverseShareId") REFERENCES "ReverseShare" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Share" ("createdAt", "creatorId", "description", "expiration", "id", "isZipReady", "removedReason", "reverseShareId", "uploadLocked", "views") SELECT "createdAt", "creatorId", "description", "expiration", "id", "isZipReady", "removedReason", "reverseShareId", "uploadLocked", "views" FROM "Share";
DROP TABLE "Share";
ALTER TABLE "new_Share" RENAME TO "Share";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
