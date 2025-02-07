import { PrismaClient } from '@prisma/client';
import { TourServiceRegistry } from './schema/tour/services/service.registry';

const prisma = new PrismaClient();
const tourService = new TourServiceRegistry(prisma);

export type GraphQLContext = {
  prisma: PrismaClient;
  tourService: TourServiceRegistry;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
    tourService,
  };
}
