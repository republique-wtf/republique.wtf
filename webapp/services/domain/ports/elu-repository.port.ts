import type { Elu } from "@/services/domain/entities/elu.entity";

export type NewEluRecord = Omit<Elu, "id">;

export interface EluRepository {
  findByUri(uri: string): Promise<Elu | null>;
  existsByUri(uri: string): Promise<boolean>;
  create(data: NewEluRecord): Promise<Elu>;
}
