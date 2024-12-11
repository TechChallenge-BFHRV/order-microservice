import { Injectable } from '@nestjs/common';
import { OrderItem } from './entities/order-items.entity';
import { OrderItemRepository } from './order-item.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaOrderItemRepository implements OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(orderItem: OrderItem): Promise<OrderItem> {
    const createdOrderItem = await this.prisma.orderItems.create({
      data: {
        orderId: orderItem.orderId,
        itemId: orderItem.itemId,
        isActive: orderItem.isActive,
      },
    });
    return createdOrderItem;
  }
  async setOrderItemId(orderItemId: number): Promise<OrderItem> {
    return await this.prisma.orderItems.update({
      where: { id: orderItemId },
      data: {
        isActive: false,
      },
    });
  }

  update(id: number, data: OrderItem): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<OrderItem[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
