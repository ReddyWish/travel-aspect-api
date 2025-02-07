import type { MutationResolvers } from './../../../types.generated';
export const deleteTourImage: NonNullable<
  MutationResolvers['deleteTourImage']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.tourImageService.delete(_arg);
};
