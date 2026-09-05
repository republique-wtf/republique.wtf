-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "eluId" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "estFonctionPublique" BOOLEAN NOT NULL,
    "estPosteElu" BOOLEAN NOT NULL,
    "nom" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_eluId_fkey" FOREIGN KEY ("eluId") REFERENCES "elus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
