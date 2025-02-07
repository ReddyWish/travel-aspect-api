import { PrismaClient } from '@prisma/client';
import {
  MutationcreateTourImageArgs,
  RequireFields,
} from '../../types.generated';

export class CreateTourImageService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationcreateTourImageArgs, 'tourId'>) {
    const { tourId, input } = _arg;

    return this.prisma.$transaction(async (tx) => {
      await tx.tourImage.createMany({
        data: input.map((image) => ({
          tourId: parseInt(tourId),
          url: image.url,
          isPrimary: image.isPrimary,
        })),
      });

      return tx.tourImage.findMany({
        where: {
          tourId: parseInt(tourId),
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    });
  }
}
