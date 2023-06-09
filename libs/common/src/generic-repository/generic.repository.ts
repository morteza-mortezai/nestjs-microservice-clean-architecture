import { Injectable } from '@nestjs/common'
import { IGenericRepository } from '../abstracts/generic-repository'
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm'
@Injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    getAll(): Promise<T[]> {
        return this._repository.find()
    }

    findOneBy(option: FindOptionsWhere<T>): Promise<T> {
        return this._repository.findOneBy(option)
    }

    delete(option: FindOptionsWhere<T>): Promise<DeleteResult> {
        return this._repository.delete(option)
    }

    create(item: T): T {
        return this._repository.create(item)
    }

    save(item: T): Promise<T> {
        return this._repository.save(item)
    }

    update(id: string, item: T) {
        return this._repository
    }
}