import type { QueryResolvers } from './../../../types.generated';
export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.category.findMany();
};
