import type { QueryResolvers } from './../../../types.generated';
export const tourImage: NonNullable<QueryResolvers['tourImage']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.tourImage.findMany({
    where: {
      tourId: parseInt(_arg.tourId),
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};
