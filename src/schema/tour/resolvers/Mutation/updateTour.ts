import type { MutationResolvers } from './../../../types.generated';
export const updateTour: NonNullable<MutationResolvers['updateTour']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return await _ctx.tourService.update(_arg);
};
