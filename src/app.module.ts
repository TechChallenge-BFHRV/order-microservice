import { PrismaOrderRepository } from './order.prisma.repository';
import { OrderRepository } from './order.repository';
import { PrismaService } from './prisma.service';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { OrderMapper } from './order.mapper';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    CreateOrderUseCase,
    UpdateOrderUseCase,
    OrderMapper,
  ],
})
export class AppModule {}
