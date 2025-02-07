import { PrismaClient } from '@prisma/client';
import {
  MutationdeleteTourArgs,
  MutationupdateTourArgs,
  RequireFields,
} from '../../types.generated';

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
            : {
                deleteMany: {},
              }),
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
            : {
                deleteMany: {},
              }),
        },
        inclusions: {
          deleteMany: {},
          ...(inclusions?.length
            ? {
                create: inclusions.map((inclusion) => ({
                  description: inclusion.description,
                })),
              }
            : {
                deleteMany: {},
              }),
        },
        exclusions: {
          deleteMany: {},
          ...(exclusions?.length
            ? {
                create: exclusions.map((exclusion) => ({
                  description: exclusion.description,
                })),
              }
            : {
                deleteMany: {},
              }),
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
            : {
                deleteMany: {},
              }),
        },
      },
    });
  }
}
