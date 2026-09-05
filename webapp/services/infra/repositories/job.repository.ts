import type { Job } from "@/services/domain/entities/job.entity";
import type {
  JobRepository,
  NewJobRecord,
} from "@/services/domain/ports/job-repository.port";
import { prisma } from "@/services/infra/db/prisma";
import type { JobModel } from "@/services/infra/db/generated/prisma/models";

function toDomain(record: JobModel): Job {
  return {
    id: record.id,
    eluId: record.eluId,
    dateDebut: record.dateDebut,
    dateFin: record.dateFin,
    estFonctionPublique: record.estFonctionPublique,
    estPosteElu: record.estPosteElu,
    nom: record.nom,
    categorie: record.categorie,
  };
}

export const jobRepository: JobRepository = {
  async findById(id) {
    const record = await prisma.job.findUnique({ where: { id } });
    return record ? toDomain(record) : null;
  },

  async findByEluId(eluId) {
    const records = await prisma.job.findMany({ where: { eluId } });
    return records.map(toDomain);
  },

  async create(data: NewJobRecord) {
    const record = await prisma.job.create({ data });
    return toDomain(record);
  },
};
