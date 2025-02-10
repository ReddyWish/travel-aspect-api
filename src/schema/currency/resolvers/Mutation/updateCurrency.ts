import type { MutationResolvers } from './../../../types.generated';
export const updateCurrency: NonNullable<
  MutationResolvers['updateCurrency']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.currencyService.update(_arg);
};
