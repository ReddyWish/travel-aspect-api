import { PrismaClient } from '@prisma/client';
import {
  MutationcreateCurrencyArgs,
  RequireFields,
} from '../../types.generated';

export class CreateCurrencyService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationcreateCurrencyArgs, 'input'>) {
    const { ...currencyData } = _arg.input;

    return this.prisma.currency.create({
      data: {
        ...currencyData,
      },
    });
  }
}
