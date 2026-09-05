import type { Elu } from "@/services/domain/entities/elu.entity";
import type { Job } from "@/services/domain/entities/job.entity";
import type { EluRepository } from "@/services/domain/ports/elu-repository.port";
import type { JobRepository } from "@/services/domain/ports/job-repository.port";

export interface EluProfile {
  elu: Elu;
  currentJobs: Job[];
  previousJobs: Array<Job & { dateFin: Date }>;
}

export async function getEluProfileByUri(
  eluRepository: EluRepository,
  jobRepository: JobRepository,
  uri: string,
): Promise<EluProfile | null> {
  const elu = await eluRepository.findByUri(uri);
  if (!elu) {
    return null;
  }

  const jobs = await jobRepository.findByEluId(elu.id);
  const currentJobs = jobs.filter((job) => job.dateFin === null);
  const previousJobs = jobs
    .filter((job): job is Job & { dateFin: Date } => job.dateFin !== null)
    .sort((a, b) => b.dateDebut.getTime() - a.dateDebut.getTime());

  return { elu, currentJobs, previousJobs };
}
