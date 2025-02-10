import type { MutationResolvers } from './../../../types.generated';
export const createCurrency: NonNullable<
  MutationResolvers['createCurrency']
> = async (_parent, _arg, _ctx) => {
  return _ctx.currencyService.create(_arg);
};
