import { PrismaClient } from '@prisma/client';
import { MutationdeleteTourArgs, RequireFields } from '../../types.generated';

export class DeleteTourService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteTourArgs, 'id'>) {
    return this.prisma.tour.delete({
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
  }
}
