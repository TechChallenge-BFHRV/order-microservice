import { Order } from '@prisma/client';
import { CreateOrderDto } from '../order.dto';
import { OrderMapper } from '../order.mapper';
import { OrderRepository } from '../order.repository';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderData = this.orderMapper.toEntity(createOrderDto);
    return this.orderRepository.create(orderData);
  }
}