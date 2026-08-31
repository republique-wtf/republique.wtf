export interface HealthRepository {
  pingDatabase(): Promise<void>;
}
