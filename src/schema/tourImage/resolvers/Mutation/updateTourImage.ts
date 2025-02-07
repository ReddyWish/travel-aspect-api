import type { MutationResolvers } from './../../../types.generated';
export const updateTourImage: NonNullable<
  MutationResolvers['updateTourImage']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.tourImageService.update(_arg);
};
