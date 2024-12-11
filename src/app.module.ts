import { PrismaOrderRepository } from './order.prisma.repository';
import { OrderRepository } from './order.repository';
import { PrismaService } from './prisma.service';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { OrderMapper } from './order.mapper';
import { AppService } from './app.service';
import { AddItemToOrderUseCase } from './usecases/order-items/add-item-to-order.usecase';
import { OrderItemRepository } from './order-item.repository';
import { PrismaOrderItemRepository } from './order-item.prisma.repository';

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
    {
      provide: OrderItemRepository,
      useClass: PrismaOrderItemRepository,
    },
    CreateOrderUseCase,
    UpdateOrderUseCase,
    AddItemToOrderUseCase,
    OrderMapper,
  ],
})
export class AppModule {}
