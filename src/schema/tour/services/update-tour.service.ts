import { PrismaClient } from '@prisma/client';
import { MutationupdateTourArgs, RequireFields } from '../../types.generated';
import { mkdir, unlink } from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'node:util';
import { join } from 'path';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(require('fs').writeFile);
const unlinkAsync = promisify(unlink);
const UPLOAD_DIR = join(process.cwd(), 'uploads/tours');

type ProcessedTourImage = {
  url: string;
  isPrimary: boolean;
};

export class UpdateTourService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationupdateTourArgs, 'id' | 'input'>) {
    const {
      categoryIds,
      price,
      program,
      images,
      inclusions,
      exclusions,
      accommodations,
      ...tourData
    } = _arg.input;

    await mkdirAsync(UPLOAD_DIR, { recursive: true });

    const existingTour = await this.prisma.tour.findUnique({
      where: { id: parseInt(_arg.id) },
      include: { images: true },
    });

    let processedImages: ProcessedTourImage[] = [];

    if (images?.length) {
      const processedPromises = images.map(async (image) => {
        if (image.url) {
          return {
            url: image.url,
            isPrimary: image.isPrimary ?? false,
          };
        } else if (image.file) {
          const fileExtension = this.getFileExtension(image.file.name);
          const filename = `${uuidv4()}${fileExtension}`;
          const filePath = join(UPLOAD_DIR, filename);

          const buffer = Buffer.from(await image.file.arrayBuffer());
          await writeFileAsync(filePath, buffer);

          return {
            url: `/uploads/tours/${filename}`,
            isPrimary: image.isPrimary ?? false,
          };
        }
        return null;
      });

      const result = await Promise.all(processedPromises);
      processedImages = result.filter(
        (result): result is ProcessedTourImage => result !== null,
      );
    }

    if (existingTour?.images) {
      const existingUrls = existingTour.images.map((img) => img.url);
      const keptUrls =
        images?.filter((img) => img.url).map((img) => img.url) || [];
      const urlsToDelete = existingUrls.filter(
        (url) => !keptUrls.includes(url),
      );

      for (const url of urlsToDelete) {
        try {
          const filename = url.split('/').pop();
          if (filename) {
            const filePath = join(UPLOAD_DIR, filename);
            await unlinkAsync(filePath);
          }
        } catch (error) {
          console.error(`Failed to delete file: ${url}:`, error);
        }
      }
    }

    return this.prisma.tour.update({
      where: {
        id: parseInt(_arg.id),
      },
      data: {
        ...tourData,
        categories: {
          set: categoryIds.map((id) => ({ id: parseInt(id) })),
        },
        price: price
          ? {
              deleteMany: {},
              create: price.map((p) => ({
                amount: p.amount,
                ...(p.comment && { comment: p.comment }),
                currency: {
                  connect: {
                    id: parseInt(p.currencyId),
                  },
                },
              })),
            }
          : undefined,
        program: {
          deleteMany: {},
          ...(program?.length
            ? {
                create: program.map((fragment) => ({
                  order: fragment.order,
                  title: fragment.title,
                  description: fragment.description,
                  startTime: fragment.startTime,
                })),
              }
            : {}),
        },
        images: {
          deleteMany: {},
          ...(processedImages.length ? { create: processedImages } : {}),
        },
        inclusions: {
          deleteMany: {},
          ...(inclusions?.length
            ? {
                create: inclusions.map((inclusion) => ({
                  description: inclusion.description,
                })),
              }
            : {}),
        },
        exclusions: {
          deleteMany: {},
          ...(exclusions?.length
            ? {
                create: exclusions.map((exclusion) => ({
                  description: exclusion.description,
                })),
              }
            : {}),
        },
        accommodations: {
          deleteMany: {},
          ...(accommodations?.length
            ? {
                create: accommodations.map((accommodation) => ({
                  hotelName: accommodation.hotelName,
                  stars: accommodation.stars,
                })),
              }
            : {}),
        },
      },
      include: {
        categories: true,
        price: {
          include: {
            currency: true,
          },
        },
        program: true,
        images: true,
        inclusions: true,
        exclusions: true,
        accommodations: true,
      },
    });
  }
  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot) : '';
  }
}
