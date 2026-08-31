import type { HealthRepository } from "@/services/domain/ports/health-repository.port";
import { prisma } from "@/services/infra/db/prisma";

export const healthRepository: HealthRepository = {
  async pingDatabase() {
    await prisma.$queryRaw`SELECT 1`;
  },
};
