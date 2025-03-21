import { PrismaClient } from '@prisma/client';
import { MutationcreateTourArgs, RequireFields } from '../../types.generated';

import { promisify } from 'node:util';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'node:fs';

type ProcessedTourImage = {
  url: string;
  isPrimary: boolean;
};

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(require('fs').writeFile);
const UPLOAD_DIR = join(process.cwd(), 'uploads/tours');

export class CreateTourService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationcreateTourArgs, 'input'>) {
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

    let processedImages: ProcessedTourImage[] = [];

    if (images?.length) {
      const processedPromises = images.map(async (image) => {
        if (image.file) {
          const fileExtension = this.getFileExtension(image.file.name);
          const filename = `${uuidv4()}${fileExtension}`;
          const filePath = join(UPLOAD_DIR, filename);

          const buffer = Buffer.from(await image.file.arrayBuffer());
          await writeFileAsync(filePath, buffer);

          return {
            url: `/uploads/tours/${filename}`,
            isPrimary: image.isPrimary ?? false,
          };
        } else if (image.url) {
          return {
            url: image.url,
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

    return this.prisma.tour.create({
      data: {
        ...tourData,
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((id) => ({ id: parseInt(id) })),
            }
          : undefined,
        price: {
          createMany: {
            data: price.map((p) => ({
              currencyId: parseInt(p.currencyId),
              amount: p.amount,
              ...(p.comment && { comment: p.comment }),
            })),
          },
        },
        program: program?.length
          ? {
              createMany: {
                data: program.map((fragment) => ({
                  order: fragment.order,
                  title: fragment.title,
                  description: fragment.description,
                  ...(fragment.startTime && { startTime: fragment.startTime }),
                })),
              },
            }
          : undefined,
        images: processedImages.length
          ? {
              createMany: {
                data: processedImages,
              },
            }
          : undefined,
        inclusions: inclusions?.length
          ? {
              createMany: {
                data: inclusions.map((inclusion) => ({
                  description: inclusion.description,
                })),
              },
            }
          : undefined,
        exclusions: exclusions?.length
          ? {
              createMany: {
                data: exclusions.map((exclusion) => ({
                  description: exclusion.description,
                })),
              },
            }
          : undefined,
        accommodations: accommodations?.length
          ? {
              createMany: {
                data: accommodations.map((accommodation) => ({
                  hotelName: accommodation.hotelName,
                  stars: accommodation.stars,
                })),
              },
            }
          : undefined,
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
