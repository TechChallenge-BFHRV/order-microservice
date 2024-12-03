export abstract class Repository<TEntity> {
  abstract create(data: TEntity): Promise<TEntity>;
  abstract update(id: number, data: TEntity): Promise<TEntity>;
  abstract getById(id: number): Promise<TEntity>;
  abstract getAll(): Promise<TEntity[]>;
  abstract delete(id: number): Promise<void>;
}
