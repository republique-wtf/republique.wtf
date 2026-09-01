import type { Elu } from "@/services/domain/entities/elu.entity";
import type { EluRepository } from "@/services/domain/ports/elu-repository.port";

export type CreateEluInput = Omit<Elu, "id" | "uri">;

export async function createElu(
  repository: EluRepository,
  input: CreateEluInput,
): Promise<Elu> {
  const baseUri = buildBaseUri(input.prenom, input.nom);
  let uri = baseUri;
  let numero = 2;

  while (await repository.existsByUri(uri)) {
    uri = `${baseUri}-${numero}`;
    numero += 1;
  }

  return repository.create({ ...input, uri });
}

function buildBaseUri(prenom: string, nom: string): string {
  return `${slugify(prenom)}-${slugify(nom)}`;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
