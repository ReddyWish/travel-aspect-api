import type { QueryResolvers } from './../../../types.generated';
export const tourExclusions: NonNullable<
  QueryResolvers['tourExclusions']
> = async (_parent, _arg, _ctx) => {
  return _ctx.prisma.tourExclusion.findMany({
    where: {
      id: parseInt(_arg.tourId),
    },
  });
};
