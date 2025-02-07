import { PrismaClient } from '@prisma/client';
import {
  MutationdeleteTourProgramArgs,
  RequireFields,
} from '../../types.generated';

export class DeleteTourProgramService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteTourProgramArgs, 'tourId'>) {
    const tourId = parseInt(_arg.tourId);
    await this.prisma.tourProgramFragment.deleteMany({
      where: {
        tourId,
      },
    });

    return [];
  }
}
