import { Order } from '@prisma/client';
import { CreateOrderDto } from '../order.dto';
import { OrderMapper } from '../order.mapper';
import { OrderRepository } from '../order.repository';
import { Injectable } from '@nestjs/common';
import { IUseCase } from './usecase';

@Injectable()
export class CreateOrderUseCase implements IUseCase<Order> {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderData = OrderMapper.toEntity(createOrderDto);
    return this.orderRepository.create(orderData);
  }
}
