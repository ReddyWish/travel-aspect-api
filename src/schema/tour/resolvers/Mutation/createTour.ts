import type { MutationResolvers } from './../../../types.generated';
export const createTour: NonNullable<MutationResolvers['createTour']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  return await _ctx.tourService.create(_arg);
};
