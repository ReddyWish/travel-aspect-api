import type { MutationResolvers } from './../../../types.generated';
export const deleteTourProgram: NonNullable<
  MutationResolvers['deleteTourProgram']
> = async (_parent, _arg, _ctx) => {
  return await _ctx.tourProgramService.delete(_arg);
};
