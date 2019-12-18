import { Repository } from 'typeorm';

export abstract class AbstractService<TEntity> {
  protected constructor(protected readonly repository: Repository<TEntity>) { }

  async getById(id: number): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  async getAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  async create(entity: TEntity): Promise<TEntity> {
    return await this.repository.save(entity);
  }
}
