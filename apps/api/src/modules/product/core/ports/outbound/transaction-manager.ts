export interface TransactionContext {
  client: unknown;
}

export interface TransactionManager {
  execute<T>(
    callback: (
      context: TransactionContext,
    ) => Promise<T>,
  ): Promise<T>;
}