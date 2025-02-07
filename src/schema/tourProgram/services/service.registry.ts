import { PrismaClient } from '@prisma/client';
import { CreateTourProgramService } from './create-tour-program.service';
import { UpdateTourProgramService } from './update-tour-program.service';
import { DeleteTourProgramService } from './delete-tour-program.service';
import {
  MutationcreateTourProgramArgs,
  MutationdeleteTourProgramArgs,
  MutationupdateTourProgramArgs,
  RequireFields,
} from '../../types.generated';

export class TourProgramServicesRegistry {
  private prisma: PrismaClient;
  private createTourProgramService!: CreateTourProgramService;
  private updateTourProgramService!: UpdateTourProgramService;
  private deleteTourProgramService!: DeleteTourProgramService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.initServices();
  }

  private initServices() {
    this.createTourProgramService = new CreateTourProgramService(this.prisma);
    this.updateTourProgramService = new UpdateTourProgramService(this.prisma);
    this.deleteTourProgramService = new DeleteTourProgramService(this.prisma);
  }

  async create(
    _arg: RequireFields<MutationcreateTourProgramArgs, 'input' | 'tourId'>,
  ) {
    return await this.createTourProgramService.execute(_arg);
  }

  async update(
    _arg: RequireFields<MutationupdateTourProgramArgs, 'input' | 'tourId'>,
  ) {
    return await this.updateTourProgramService.execute(_arg);
  }

  async delete(_arg: RequireFields<MutationdeleteTourProgramArgs, 'tourId'>) {
    return await this.deleteTourProgramService.execute(_arg);
  }
}
