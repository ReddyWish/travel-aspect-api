import type { QueryResolvers } from './../../../types.generated';
export const tourAccommodations: NonNullable<
  QueryResolvers['tourAccommodations']
> = async (_parent, _arg, _ctx) => {
  return _ctx.prisma.tourAccommodation.findMany({
    where: {
      id: parseInt(_arg.tourId),
    },
  });
};
