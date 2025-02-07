import { PrismaClient } from '@prisma/client';
import { TourServiceRegistry } from './schema/tour/services/service.registry';
import { CategoryServicesRegistry } from './schema/category/services/service.registry';

const prisma = new PrismaClient();
const tourService = new TourServiceRegistry(prisma);
const categoryService = new CategoryServicesRegistry(prisma);

export type GraphQLContext = {
  prisma: PrismaClient;
  tourService: TourServiceRegistry;
  categoryService: CategoryServicesRegistry;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
    tourService,
    categoryService,
  };
}
