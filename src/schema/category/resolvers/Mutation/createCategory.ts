import type { MutationResolvers } from './../../../types.generated';
export const createCategory: NonNullable<
  MutationResolvers['createCategory']
> = async (_parent, _arg, _ctx) => {
  return _ctx.categoryService.create(_arg);
};
