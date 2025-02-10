import { PrismaClient } from '@prisma/client';
import {
  RequireFields,
  MutationdeleteCurrencyArgs,
} from '../../types.generated';

export class DeleteCurrencyService {
  constructor(private prisma: PrismaClient) {}

  async execute(_arg: RequireFields<MutationdeleteCurrencyArgs, 'id'>) {
    return this.prisma.currency.delete({
      where: {
        id: parseInt(_arg.id),
      },
    });
  }
}
