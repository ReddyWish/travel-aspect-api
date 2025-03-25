import { PrismaClient } from '@prisma/client';
import { MutationdeleteTourArgs, RequireFields } from '../../types.generated';
import { join } from 'path';
import { promisify } from 'node:util';
import { unlink } from 'node:fs';

const unlinkAsync = promisify(unlink);
const UPLOAD_DIR = join(process.cwd(), 'uploads/tours');

export class DeleteTourService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteTourArgs, 'id'>) {
    const tour = await this.prisma.tour.findUnique({
      where: {
        id: parseInt(_arg.id),
      },
      include: {
        images: true,
      },
    });

    if (!tour) {
      throw new Error(`Tour with id ${_arg.id} not found.`);
    }

    const deletedTour = await this.prisma.tour.delete({
      where: {
        id: parseInt(_arg.id),
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

    if (tour.images && tour.images.length > 0) {
      const deletePromises = tour.images.map(async (image) => {
        try {
          const fileName = image.url.split('/').pop();
          if (fileName) {
            const filePath = join(UPLOAD_DIR, fileName);
            await unlinkAsync(filePath);
          }
        } catch (error) {
          console.error(`Failed to delete file ${image.url}: ${error}`);
        }
      });

      await Promise.all(deletePromises);
    }

    return deletedTour;
  }
}
