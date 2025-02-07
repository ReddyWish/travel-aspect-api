import { PrismaClient } from '@prisma/client';
import { CreateCategoryService } from './create-category.service';
import { DeleteCategoryService } from './delete-category.service';
import { UpdateCategoryService } from './update-category.service';
import {
  MutationcreateCategoryArgs,
  MutationdeleteCategoryArgs,
  MutationupdateCategoryArgs,
  RequireFields,
} from '../../types.generated';

export class CategoryServicesRegistry {
  private prisma: PrismaClient;
  private createCategoryService!: CreateCategoryService;
  private deleteCategoryService!: DeleteCategoryService;
  private updateCategoryService!: UpdateCategoryService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.initServices();
  }

  private initServices() {
    this.createCategoryService = new CreateCategoryService(this.prisma);
    this.deleteCategoryService = new DeleteCategoryService(this.prisma);
    this.updateCategoryService = new UpdateCategoryService(this.prisma);
  }

  async create(_arg: RequireFields<MutationcreateCategoryArgs, 'input'>) {
    return await this.createCategoryService.execute(_arg);
  }

  async delete(_arg: RequireFields<MutationdeleteCategoryArgs, 'id'>) {
    return await this.deleteCategoryService.execute(_arg);
  }

  async update(
    _arg: RequireFields<MutationupdateCategoryArgs, 'id' | 'input'>,
  ) {
    return await this.updateCategoryService.execute(_arg);
  }
}
