import { PrismaClient } from '@prisma/client';

import { CreateCurrencyService } from './create-currency.service';
import { UpdateCurrencyService } from './update-currency.service';
import { DeleteCurrencyService } from './delete-currency.service';
import {
  MutationcreateCurrencyArgs,
  MutationdeleteCurrencyArgs,
  MutationupdateCurrencyArgs,
  RequireFields,
} from '../../types.generated';

export class CurrencyServicesRegistry {
  private prisma: PrismaClient;
  private createCurrencyService!: CreateCurrencyService;
  private updateCurrencyService!: UpdateCurrencyService;
  private deleteTourPriceService!: DeleteCurrencyService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.initServices();
  }

  private initServices() {
    this.createCurrencyService = new CreateCurrencyService(this.prisma);
    this.updateCurrencyService = new UpdateCurrencyService(this.prisma);
    this.deleteTourPriceService = new DeleteCurrencyService(this.prisma);
  }

  async create(_arg: RequireFields<MutationcreateCurrencyArgs, 'input'>) {
    return await this.createCurrencyService.execute(_arg);
  }

  async update(
    _arg: RequireFields<MutationupdateCurrencyArgs, 'id' | 'input'>,
  ) {
    return await this.updateCurrencyService.execute(_arg);
  }

  async delete(_arg: RequireFields<MutationdeleteCurrencyArgs, 'id'>) {
    return await this.deleteTourPriceService.execute(_arg);
  }
}
