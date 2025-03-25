import {
  MutationdeleteCategoryArgs,
  RequireFields,
} from '../../types.generated';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'node:util';
import { mkdir, unlink } from 'node:fs';
import { join } from 'path';

const unlinkAsync = promisify(unlink);
const UPLOAD_DIR = join(process.cwd(), 'uploads/categories');

export class DeleteCategoryService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteCategoryArgs, 'id'>) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: parseInt(_arg.id),
      },
    });

    if (!category) {
      throw new Error(`Category with id ${_arg.id} not found`);
    }

    const deletedCategory = await this.prisma.category.delete({
      where: {
        id: parseInt(_arg.id),
      },
    });

    if (category.imageUrl) {
      try {
        const fileName = category.imageUrl.split('/').pop();
        if (fileName) {
          const filePath = join(UPLOAD_DIR, fileName);
          await unlinkAsync(filePath);
        }
      } catch (error) {
        console.error(`Failed to delete Category: ${error}`);
      }
    }

    return deletedCategory;
  }
}
