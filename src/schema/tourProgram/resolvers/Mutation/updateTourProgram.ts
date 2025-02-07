import type { MutationResolvers } from './../../../types.generated';
export const updateTourProgram: NonNullable<
  MutationResolvers['updateTourProgram']
> = async (_parent, _arg, _ctx) => {
  return _ctx.tourProgramService.update(_arg);
};
