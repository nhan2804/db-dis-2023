import {
  AnyKeys,
  AnyObject,
  CallbackWithoutResult,
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { User } from 'src/users/entities/user.entity';
// import { Cacheable } from '../modules/CacheableModule.module';
import { ID } from '../../types/ID';
export abstract class AbstractService<T, S = T & Document> {
  protected model: Model<S>;
  constructor(model: Model<S>) {
    this.model = model;
  }
  public async canCreate(input: T, user?: User) {
    return true;
  }
  public async canUpdate(id: ID, user?: User) {
    return true;
  }
  public async canDelete(id: ID, user?: User) {
    return true;
  }
  public async canSee(query: FilterQuery<S>, user?: User) {
    return true;
  }
  public async canSeeOne(id: ID, user?: User) {
    return true;
  }
  async create(input: T, user?: User) {
    if (await this.canCreate(input, user)) {
      const newDocument = await this.model.create(input);
      // this.createNewUserNode(newUser.id);
      return newDocument;
    }
  }
  protected find(user?: User, ...all: Parameters<Model<S>['find']>) {
    return this.model.find(...all);
  }

  async findAll(
    query: FilterQuery<T> = {},

    page = 1,
    perPage = 20,
    user?: User,
    populates?: PopulateOptions | Array<PopulateOptions> | any,
    sort?: any,
  ) {
    if (!perPage) {
      perPage = 20;
    }
    if (!page) {
      page = 1;
    }

    if (!(await this.canSee(query, user))) return;
    const getCount = this.model.countDocuments(query);
    const getDocuments = this.find(
      user,
      query,
      {},
      { limit: perPage, skip: (page - 1) * perPage },
    );
    if (sort) {
      getDocuments.sort(sort);
    }
    if (populates) {
      getDocuments.populate(populates);
    }

    const [documents, count] = await Promise.all([
      await getDocuments,
      await getCount,
    ]);
    return {
      data: documents,
      count: count,
      totalPages: Math.ceil(count / perPage),
      gido: 'false',
      perPage,
    };
  }

  async findAllWithoutPagination(
    query: FilterQuery<T> = {},
    user?: User,
    populates?: PopulateOptions | Array<PopulateOptions> | any,
    sort?: any,
    options?: { projection: any; limit?: number },
  ) {
    if (!(await this.canSee(query, user))) return;
    const getDocuments = this.find(user, query);
    if (populates) getDocuments.populate(populates);
    getDocuments.sort(sort || { createdAt: -1 });
    if (options?.projection) getDocuments.projection(options?.projection);
    if (options?.limit) getDocuments.limit(options?.limit);
    return getDocuments;
  }

  // async findAllKeysetPaginate(keyset: string) {
  //   const getCount = this.model.countDocuments();
  //   const getDocuments = this.model.find(
  //     {},
  //     {},
  //     { limit: perPage, skip: (page - 1) * perPage },
  //   );
  //   const [documents, count] = await Promise.all([
  //     await getDocuments,
  //     await getCount,
  //   ]);
  //   return {
  //     data: documents,
  //     count: count,
  //     totalPages: Math.round(count / perPage),
  //   };
  // }

  async findOne(query: FilterQuery<T>, user?: User) {
    if (!(await this.canSee(query, user))) return;
    return this.model.findOne(query);
  }

  async findOneById(id: ID, user?: User, projection?: any) {
    if (!(await this.canSeeOne(id, user))) return;
    return this.model.findById(id, projection);
  }

  async update(id: ID, updateInput: UpdateQuery<T>, user?: User) {
    if (await this.canUpdate(id, user)) {
      return this.model.findByIdAndUpdate(id, updateInput, { new: true });
    }
  }
  async insertMany(arr: Array<AnyKeys<T> | AnyObject>, user?: User) {
    // if (await this.canCreate(null, user)) {
    return this.model.insertMany(arr);
    // }
  }
  updateMany(...args: Parameters<Model<S>['updateMany']>) {
    return this.model.updateMany(...args);
  }
  updateOne(...args: Parameters<Model<S>['updateOne']>) {
    return this.model.updateOne(...args);
  }
  findOneAndUpdate(...args: Parameters<Model<S>['findOneAndUpdate']>) {
    return this.model.findOneAndUpdate(...args);
  }
  countDocuments(...args: Parameters<Model<S>['countDocuments']>) {
    return this.model.countDocuments(...args);
  }
  //   const ids = [id1, id2, id3...];
  // const query = { _id: { $in: ids} };
  // dbo.collection("users").deleteMany(query, (err, obj) => {
  //     if (err) throw err;
  // });
  async remove(id: ID, user?: User) {
    if (await this.canDelete(id, user)) {
      return this.model.findByIdAndDelete(id);
    }
  }
  async removeMany(ids: string[], user?: User) {
    const idsObj = ids?.map((e) => new Types.ObjectId(e));
    // if (await this.canDelete(id, user)) {
    return this.model.deleteMany({ _id: { $in: idsObj } });
    // }
  }
  async deleteMany(
    filter?: FilterQuery<S>,
    options?: QueryOptions,
    callback?: CallbackWithoutResult,
  ) {
    return this.model.deleteMany(filter, options, callback);
  }
  async removeByProjectId(idProject: string): Promise<any> {
    return this.model.deleteMany({
      projectId: new Types.ObjectId(idProject),
    });
  }
}
