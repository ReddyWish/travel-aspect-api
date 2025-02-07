import { PrismaClient } from '@prisma/client';
import { CreateTourImageService } from './create-tour-image.service';
import { UpdateTourImageService } from './update-tour-image.service';
import { DeleteTourImageService } from './delete-tour-image.service';
import {
  MutationcreateTourImageArgs,
  MutationdeleteTourImageArgs,
  MutationupdateTourImageArgs,
  RequireFields,
} from '../../types.generated';

export class TourImageServiceRegistry {
  private prisma: PrismaClient;
  private createTourImageService!: CreateTourImageService;
  private updateTourImageService!: UpdateTourImageService;
  private deleteTourImageService!: DeleteTourImageService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.initServices();
  }

  private initServices() {
    this.createTourImageService = new CreateTourImageService(this.prisma);
    this.updateTourImageService = new UpdateTourImageService(this.prisma);
    this.deleteTourImageService = new DeleteTourImageService(this.prisma);
  }

  async create(_arg: RequireFields<MutationcreateTourImageArgs, 'tourId'>) {
    return await this.createTourImageService.execute(_arg);
  }

  async update(_arg: RequireFields<MutationupdateTourImageArgs, 'tourId'>) {
    return await this.updateTourImageService.execute(_arg);
  }

  async delete(_arg: RequireFields<MutationdeleteTourImageArgs, 'tourId'>) {
    return await this.deleteTourImageService.execute(_arg);
  }
}
