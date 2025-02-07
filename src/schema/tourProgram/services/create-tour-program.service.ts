import { PrismaClient } from '@prisma/client';
import {
  MutationcreateTourProgramArgs,
  RequireFields,
  TourProgramFragmentCreateInput,
} from '../../types.generated';

export class CreateTourProgramService {
  constructor(private prisma: PrismaClient) {}

  async execute(
    _arg: RequireFields<MutationcreateTourProgramArgs, 'input' | 'tourId'>,
  ) {
    const { input, tourId } = _arg;

    return this.prisma.$transaction(async (tx) => {
      await this.prisma.tourProgramFragment.createMany({
        data: input.map((fragment: TourProgramFragmentCreateInput) => ({
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
