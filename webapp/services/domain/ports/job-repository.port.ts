import type { Job } from "@/services/domain/entities/job.entity";

export type NewJobRecord = Omit<Job, "id">;

export interface JobRepository {
  findById(id: string): Promise<Job | null>;
  findByEluId(eluId: string): Promise<Job[]>;
  create(data: NewJobRecord): Promise<Job>;
}
