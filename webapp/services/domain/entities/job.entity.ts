export interface Job {
  id: string;
  eluId: string;
  dateDebut: Date;
  dateFin: Date | null;
  estFonctionPublique: boolean;
  estPosteElu: boolean;
  nom: string;
  categorie: string;
}
