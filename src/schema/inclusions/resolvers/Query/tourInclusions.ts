import type { QueryResolvers } from './../../../types.generated';
export const tourInclusions: NonNullable<
  QueryResolvers['tourInclusions']
> = async (_parent, _arg, _ctx) => {
  return _ctx.prisma.tourInclusion.findMany({
    where: {
      id: parseInt(_arg.tourId),
    },
  });
};
