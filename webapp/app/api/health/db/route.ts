import { getDatabaseHealth } from "@/services/infra/controllers/health.controller";

export async function GET() {
  const { httpStatus, body } = await getDatabaseHealth();
  return Response.json(body, { status: httpStatus });
}
