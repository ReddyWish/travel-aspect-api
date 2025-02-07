import {
  MutationdeleteCategoryArgs,
  RequireFields,
} from '../../types.generated';
import { PrismaClient } from '@prisma/client';

export class DeleteCategoryService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteCategoryArgs, 'id'>) {
    return this.prisma.category.delete({
      where: {
        id: parseInt(_arg.id),
      },
    });
  }
}
