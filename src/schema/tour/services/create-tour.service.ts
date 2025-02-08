import { PrismaClient } from '@prisma/client';
import { MutationcreateTourArgs, RequireFields } from '../../types.generated';

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

    return this.prisma.tour.create({
      data: {
        ...tourData,
        categories: categoryIds?.length
          ? {
              connect: categoryIds.map((id) => ({ id: parseInt(id) })),
            }
          : undefined,
        price: price
          ? {
              createMany: {
                data: price.map((p) => ({
                  currencyId: parseInt(p.currencyId),
                  amount: p.amount,
                  ...(p.comment && { comment: p.comment }),
                  isBasePrice: p.isBasePrice,
                })),
              },
            }
          : undefined,
        program: program?.length
          ? {
              create: program.map((fragment) => ({
                order: fragment.order,
                title: fragment.title,
                description: fragment.description,
                startTime: fragment.startTime,
              })),
            }
          : undefined,
        images: images?.length
          ? {
              create: images.map((image) => ({
                url: image.url,
                isPrimary: image.isPrimary ?? false,
              })),
            }
          : undefined,
        inclusions: inclusions?.length
          ? {
              create: inclusions.map((inclusion) => ({
                description: inclusion.description,
              })),
            }
          : undefined,
        exclusions: exclusions?.length
          ? {
              create: exclusions.map((exclusion) => ({
                description: exclusion.description,
              })),
            }
          : undefined,
        accommodations: accommodations?.length
          ? {
              create: accommodations.map((accommodation) => ({
                hotelName: accommodation.hotelName,
                stars: accommodation.stars,
              })),
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
}
