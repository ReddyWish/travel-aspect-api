import type { QueryResolvers } from './../../../types.generated';
export const tour: NonNullable<QueryResolvers['tour']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  const result = await _ctx.prisma.tour.findUnique({
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

  return transformTourData(result);
};
