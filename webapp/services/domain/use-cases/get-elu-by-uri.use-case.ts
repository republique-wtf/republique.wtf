import type { Elu } from "@/services/domain/entities/elu.entity";
import type { EluRepository } from "@/services/domain/ports/elu-repository.port";

export async function getEluByUri(
  repository: EluRepository,
  uri: string,
): Promise<Elu | null> {
  return repository.findByUri(uri);
}
