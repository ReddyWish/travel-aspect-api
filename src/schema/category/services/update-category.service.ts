import {
  MutationupdateCategoryArgs,
  RequireFields,
} from '../../types.generated';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { mkdir, unlink } from 'node:fs';
import { promisify } from 'node:util';
import { join } from 'path';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(require('fs').writeFile);
const unlinkAsync = promisify(unlink);
const UPLOAD_DIR = join(process.cwd(), 'uploads/categories');

export class UpdateCategoryService {
  constructor(private prisma: PrismaClient) {}

  async execute(
    _arg: RequireFields<MutationupdateCategoryArgs, 'id' | 'input'>,
  ) {
    const { id, input } = _arg;
    const { name, image, description } = input;

    await mkdirAsync(UPLOAD_DIR, { recursive: true });

    const existingCategory = await this.prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      throw new Error(`Category with id ${id} not found.`);
    }

    let imageUrl;

    if (image) {
      if (image.file) {
        const fileExtension = this.getFileExtension(image.file.name);
        const filename = `${uuidv4()}${fileExtension}`;
        const filePath = join(UPLOAD_DIR, filename);
        const buffer = Buffer.from(await image.file.arrayBuffer());
        await writeFileAsync(filePath, buffer);

        imageUrl = `/uploads/categories/${filename}`;

        if (existingCategory.imageUrl) {
          try {
            const prevFileName = existingCategory.imageUrl.split('/').pop();
            if (prevFileName) {
              const prevFilePath = join(UPLOAD_DIR, prevFileName);
              await unlinkAsync(prevFilePath);
            }
          } catch (error) {
            console.error(
              `Failed to delete file: ${existingCategory.imageUrl}`,
            );
          }
        }
      } else if (image.imageUrl && !image.file) {
        imageUrl = image.imageUrl;
      }
    }

    return this.prisma.category.update({
      where: {
        id: parseInt(_arg.id),
      },
      data: {
        name,
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });
  }

  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot) : '';
  }
}
