import type { MutationResolvers } from './../../../types.generated';
export const createTourImage: NonNullable<
  MutationResolvers['createTourImage']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.tourImageService.create(_arg);
};
