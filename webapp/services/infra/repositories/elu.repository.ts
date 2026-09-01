import type { Elu } from "@/services/domain/entities/elu.entity";
import type {
  EluRepository,
  NewEluRecord,
} from "@/services/domain/ports/elu-repository.port";
import { prisma } from "@/services/infra/db/prisma";
import type { EluModel } from "@/services/infra/db/generated/prisma/models";

function toDomain(record: EluModel): Elu {
  return {
    id: record.id,
    nom: record.nom,
    prenom: record.prenom,
    dateNaissance: record.dateNaissance,
    photoProfil: record.photoProfil,
    uri: record.uri,
  };
}

export const eluRepository: EluRepository = {
  async findByUri(uri) {
    const record = await prisma.elu.findUnique({ where: { uri } });
    return record ? toDomain(record) : null;
  },

  async existsByUri(uri) {
    const count = await prisma.elu.count({ where: { uri } });
    return count > 0;
  },

  async create(data: NewEluRecord) {
    const record = await prisma.elu.create({ data });
    return toDomain(record);
  },
};
