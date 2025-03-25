import { PrismaClient } from '@prisma/client';
import {
  MutationcreateCategoryArgs,
  RequireFields,
} from '../../types.generated';
import { promisify } from 'node:util';
import { mkdir } from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(require('fs').writeFile);
const UPLOAD_DIR = join(process.cwd(), 'uploads/categories');

export class CreateCategoryService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationcreateCategoryArgs, 'input'>) {
    const { name, image, description } = _arg.input;

    await mkdirAsync(UPLOAD_DIR, { recursive: true });

    let imageUrl = '';

    if (image) {
      if (image.file) {
        const fileExtension = this.getFileExtension(image.file.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = join(UPLOAD_DIR, fileName);

        const buffer = Buffer.from(await image.file.arrayBuffer());
        await writeFileAsync(filePath, buffer);

        imageUrl = `/uploads/categories/${fileName}`;
      } else if (image.imageUrl && !image.file) {
        imageUrl = image.imageUrl;
      }
    }

    return this.prisma.category.create({
      data: {
        name,
        imageUrl,
        ...(description && { description }),
      },
    });
  }

  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot) : '';
  }
}
