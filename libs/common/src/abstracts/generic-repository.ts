export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;

    abstract findOneBy(option: any): Promise<T>;

    abstract save(item: T): Promise<T>;

    abstract update(id: string, item: T);

    abstract delete(option: any): Promise<any>;

    abstract create(item: T): T
}
