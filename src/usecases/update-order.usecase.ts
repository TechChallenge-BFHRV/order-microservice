import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { UpdateOrderDto } from '../order.dto';
import { OrderMapper } from '../order.mapper';
import { OrderRepository } from '../order.repository';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderMapper: OrderMapper,
  ) {}

  async execute(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.getById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const order = this.orderMapper.toEntity(updateOrderDto, existingOrder);
    return this.orderRepository.update(id, order);
  }
}
