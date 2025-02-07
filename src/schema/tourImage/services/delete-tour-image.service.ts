import { PrismaClient } from '@prisma/client';
import {
  MutationdeleteTourImageArgs,
  RequireFields,
} from '../../types.generated';

export class DeleteTourImageService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteTourImageArgs, 'tourId'>) {
    const { tourId } = _arg;
    this.prisma.tourImage.deleteMany({
      where: {
        tourId: parseInt(tourId),
      },
    });
    return [];
  }
}
