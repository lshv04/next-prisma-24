-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "field1" TEXT NOT NULL,
    "field2" TEXT DEFAULT '',
    "field3" TEXT DEFAULT '',
    "field4" TEXT DEFAULT '',
    "field5" TEXT DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserData" ("createdAt", "email", "field1", "field2", "field3", "field4", "field5", "id", "userId") SELECT "createdAt", "email", "field1", "field2", "field3", "field4", "field5", "id", "userId" FROM "UserData";
DROP TABLE "UserData";
ALTER TABLE "new_UserData" RENAME TO "UserData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
