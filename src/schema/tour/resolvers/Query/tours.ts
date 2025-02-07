import type { QueryResolvers } from './../../../types.generated';
export const tours: NonNullable<QueryResolvers['tours']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.tour.findMany({
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
};
