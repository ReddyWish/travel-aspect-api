import type { QueryResolvers } from './../../../types.generated';
export const currencies: NonNullable<QueryResolvers['currencies']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.currency.findMany();
};
