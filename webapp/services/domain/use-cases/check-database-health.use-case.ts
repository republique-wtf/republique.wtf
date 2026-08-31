import type { HealthRepository } from "@/services/domain/ports/health-repository.port";

export type DatabaseHealthResult =
  | { ok: true }
  | { ok: false; reason: string };

export async function checkDatabaseHealth(
  repository: HealthRepository,
): Promise<DatabaseHealthResult> {
  try {
    await repository.pingDatabase();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: (error as Error).message };
  }
}
