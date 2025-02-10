import type { QueryResolvers } from './../../../types.generated';
export const currency: NonNullable<QueryResolvers['currency']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return _ctx.prisma.currency.findUnique({
    where: {
      id: parseInt(_arg.id),
    },
  });
};
