import { PrismaClient } from '@prisma/client';
import {
  MutationupdateTourProgramArgs,
  RequireFields,
} from '../../types.generated';

export class UpdateTourProgramService {
  constructor(private prisma: PrismaClient) {}

  async execute(
    _arg: RequireFields<MutationupdateTourProgramArgs, 'input' | 'tourId'>,
  ) {
    const { tourId, input } = _arg;

    return this.prisma.$transaction(async (tx) => {
      await tx.tourProgramFragment.deleteMany({
        where: {
          tourId: parseInt(tourId),
        },
      });

      if (!input) {
        return [];
      }

      await tx.tourProgramFragment.createMany({
        data: input.map((fragment) => ({
          tourId: parseInt(tourId),
          order: fragment.order,
          title: fragment.title,
          description: fragment.description,
          startTime: fragment.startTime,
        })),
      });

      return tx.tourProgramFragment.findMany({
        where: {
          tourId: parseInt(tourId),
        },
        orderBy: {
          order: 'asc',
        },
      });
    });
  }
}
