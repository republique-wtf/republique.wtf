import { checkDatabaseHealth } from "@/services/domain/use-cases/check-database-health.use-case";
import { healthRepository } from "@/services/infra/repositories/health.repository";

export async function getDatabaseHealth() {
  const result = await checkDatabaseHealth(healthRepository);

  if (result.ok) {
    return { httpStatus: 200 as const, body: { status: "ok" as const } };
  }

  return {
    httpStatus: 500 as const,
    body: { status: "error" as const, message: result.reason },
  };
}
