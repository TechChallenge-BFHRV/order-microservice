import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { UpdateOrderDto } from '../order.dto';
import { OrderMapper } from '../order.mapper';
import { OrderRepository } from '../order.repository';
import { IUseCase } from './usecase';

@Injectable()
export class UpdateOrderUseCase implements IUseCase<Order> {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.getById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const order = OrderMapper.toEntity(updateOrderDto, existingOrder);
    return this.orderRepository.update(id, order);
  }
}
