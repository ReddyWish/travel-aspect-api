import { PrismaClient } from '@prisma/client';
import {
  MutationupdateCurrencyArgs,
  RequireFields,
} from '../../types.generated';

export class UpdateCurrencyService {
  constructor(private prisma: PrismaClient) {}

  async execute(
    _arg: RequireFields<MutationupdateCurrencyArgs, 'input' | 'id'>,
  ) {
    const { ...currencyData } = _arg.input;

    return this.prisma.currency.update({
      where: {
        id: parseInt(_arg.id),
      },
      data: {
        ...currencyData,
      },
    });
  }
}
