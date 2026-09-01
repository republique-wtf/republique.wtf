import { getEluByUri } from "@/services/domain/use-cases/get-elu-by-uri.use-case";
import { eluRepository } from "@/services/infra/repositories/elu.repository";

export async function getEluPageData(uri: string) {
  return getEluByUri(eluRepository, uri);
}
