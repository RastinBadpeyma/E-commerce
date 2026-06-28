export interface HashService {
  hash(value: string): Promise<string>;
}