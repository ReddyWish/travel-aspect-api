import { PrismaClient } from '@prisma/client';
import { CreateTourService } from './create-tour.service';
import {
  MutationcreateTourArgs,
  MutationdeleteTourArgs,
  MutationupdateTourArgs,
  RequireFields,
} from '../../types.generated';
import { UpdateTourService } from './update-tour.service';
import { DeleteTourService } from './delete-tour.service';

export class TourServiceRegistry {
  private prisma: PrismaClient;
  private createTourService!: CreateTourService;
  private updateTourService!: UpdateTourService;
  private deleteTourService!: DeleteTourService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.initServices();
  }

  private initServices() {
    this.createTourService = new CreateTourService(this.prisma);
    this.updateTourService = new UpdateTourService(this.prisma);
    this.deleteTourService = new DeleteTourService(this.prisma);
  }

  async create(_arg: RequireFields<MutationcreateTourArgs, 'input'>) {
    return await this.createTourService.execute(_arg);
  }

  async update(_arg: RequireFields<MutationupdateTourArgs, 'input' | 'id'>) {
    return await this.updateTourService.execute(_arg);
  }

  async delete(_arg: RequireFields<MutationdeleteTourArgs, 'id'>) {
    return await this.deleteTourService.execute(_arg);
  }
}
