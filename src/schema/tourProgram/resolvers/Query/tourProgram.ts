import type { QueryResolvers } from './../../../types.generated';
export const tourProgram: NonNullable<QueryResolvers['tourProgram']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.tourProgramFragment.findMany({
    where: {
      tourId: parseInt(_arg.tourId),
    },
    orderBy: {
      order: 'asc',
    },
  });
};
