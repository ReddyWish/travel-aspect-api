import { PrismaClient } from '@prisma/client';
import { TourServiceRegistry } from './schema/tour/services/service.registry';
import { CategoryServicesRegistry } from './schema/category/services/service.registry';
import { TourProgramServicesRegistry } from './schema/tourProgram/services/service.registry';
import { CurrencyServicesRegistry } from './schema/currency/services/services.registry';
import { TourImageServiceRegistry } from './schema/tourImage/services/services.registry';

const prisma = new PrismaClient();
const tourService = new TourServiceRegistry(prisma);
const currencyService = new CurrencyServicesRegistry(prisma);
const categoryService = new CategoryServicesRegistry(prisma);
const tourProgramService = new TourProgramServicesRegistry(prisma);
const tourImageService = new TourImageServiceRegistry(prisma);

export type GraphQLContext = {
  prisma: PrismaClient;
  tourService: TourServiceRegistry;
  categoryService: CategoryServicesRegistry;
  currencyService: CurrencyServicesRegistry;
  tourProgramService: TourProgramServicesRegistry;
  tourImageService: TourImageServiceRegistry;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
    tourService,
    categoryService,
    currencyService,
    tourProgramService,
    tourImageService,
  };
}
