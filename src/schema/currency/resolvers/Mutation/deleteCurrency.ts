import type { MutationResolvers } from './../../../types.generated';
export const deleteCurrency: NonNullable<
  MutationResolvers['deleteCurrency']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.currencyService.delete(_arg);
};
