import { PrismaClient } from '@prisma/client';
import {
  MutationupdateTourImageArgs,
  RequireFields,
} from '../../types.generated';

export class UpdateTourImageService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(
    _arg: RequireFields<MutationupdateTourImageArgs, 'input' | 'tourId'>,
  ) {
    const { tourId, input } = _arg;

    return this.prisma.$transaction(async (tx) => {
      await this.prisma.tourImage.deleteMany({
        where: {
          tourId: parseInt(tourId),
        },
      });

      if (input.length === 0) {
        return [];
      }

      await tx.tourImage.createMany({
        data: input.map((image) => ({
          tourId: parseInt(tourId),
          url: image.url,
          isPrimary: image.isPrimary,
        })),
      });

      return this.prisma.tourImage.findMany({
        where: {
          tourId: parseInt(tourId),
        },
      });
    });
  }
}
