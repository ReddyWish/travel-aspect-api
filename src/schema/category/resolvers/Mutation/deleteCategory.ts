import type { MutationResolvers } from './../../../types.generated';
export const deleteCategory: NonNullable<
  MutationResolvers['deleteCategory']
> = async (_parent, _arg, _ctx) => {
  return _ctx.categoryService.delete(_arg);
};
