import { getEluProfileByUri } from "@/services/domain/use-cases/get-elu-profile.use-case";
import { eluRepository } from "@/services/infra/repositories/elu.repository";
import { jobRepository } from "@/services/infra/repositories/job.repository";

export async function getEluPageData(uri: string) {
  return getEluProfileByUri(eluRepository, jobRepository, uri);
}
