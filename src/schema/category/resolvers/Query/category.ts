import type { QueryResolvers } from './../../../types.generated';
export const category: NonNullable<QueryResolvers['category']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.category.findUnique({
    where: {
      id: parseInt(_arg.id),
    },
  });
};
