import { PrismaClient } from '@prisma/client';
import { MutationupdateTourArgs, RequireFields } from '../../types.generated';

export class UpdateTourService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationupdateTourArgs, 'id' | 'input'>) {
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

    return this.prisma.tour.update({
      where: {
        id: parseInt(_arg.id),
      },
      data: {
        ...tourData,
        categories: {
          set: categoryIds.map((id) => ({ id: parseInt(id) })),
        },
        price: price
          ? {
              deleteMany: {},
              create: price.map((p) => ({
                amount: p.amount,
                ...(p.comment && { comment: p.comment }),
                isBasePrice: p.isBasePrice,
                currency: {
                  connect: {
                    id: parseInt(p.currencyId),
                  },
                },
              })),
            }
          : undefined,
        program: {
          deleteMany: {},
          ...(program?.length
            ? {
                create: program.map((fragment) => ({
                  order: fragment.order,
                  title: fragment.title,
                  description: fragment.description,
                  startTime: fragment.startTime,
                })),
              }
            : {}),
        },
        images: {
          deleteMany: {},
          ...(images?.length
            ? {
                create: images.map((image) => ({
                  url: image.url,
                  isPrimary: image.isPrimary ?? false,
                })),
              }
            : {}),
        },
        inclusions: {
          deleteMany: {},
          ...(inclusions?.length
            ? {
                create: inclusions.map((inclusion) => ({
                  description: inclusion.description,
                })),
              }
            : {}),
        },
        exclusions: {
          deleteMany: {},
          ...(exclusions?.length
            ? {
                create: exclusions.map((exclusion) => ({
                  description: exclusion.description,
                })),
              }
            : {}),
        },
        accommodations: {
          deleteMany: {},
          ...(accommodations?.length
            ? {
                create: accommodations.map((accommodation) => ({
                  hotelName: accommodation.hotelName,
                  stars: accommodation.stars,
                })),
              }
            : {}),
        },
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
