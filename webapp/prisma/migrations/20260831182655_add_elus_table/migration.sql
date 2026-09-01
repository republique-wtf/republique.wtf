-- CreateTable
CREATE TABLE "elus" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "photoProfil" TEXT,
    "uri" TEXT NOT NULL,

    CONSTRAINT "elus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "elus_uri_key" ON "elus"("uri");
