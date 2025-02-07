import type { MutationResolvers } from './../../../types.generated';
export const createTourProgram: NonNullable<
  MutationResolvers['createTourProgram']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.tourProgramService.create(_arg);
};
