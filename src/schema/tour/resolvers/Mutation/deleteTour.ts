import type { MutationResolvers } from './../../../types.generated';
export const deleteTour: NonNullable<MutationResolvers['deleteTour']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return await _ctx.tourService.delete(_arg);
};
