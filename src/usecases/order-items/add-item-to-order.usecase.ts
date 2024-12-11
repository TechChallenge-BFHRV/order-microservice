import { Injectable } from '@nestjs/common';
import { IUseCase } from '../usecase';
import { OrderItem } from '../../entities/order-items.entity';
import { OrderItemRepository } from '../../order-item.repository';
import { AddItemToOrderDTO } from '../../add-item-to-order-dto';
import { OrderItemMapper } from '../../order-item.mapper';

@Injectable()
export class AddItemToOrderUseCase implements IUseCase<OrderItem> {
  constructor(
    private readonly orderItemRepository: OrderItemRepository
  ) {}

  async execute(orderItem: AddItemToOrderDTO): Promise<OrderItem> {
    const createdOrderItem = await this.orderItemRepository.create(
      OrderItemMapper.toEntity(orderItem),
    );

    return OrderItemMapper.toDTO(createdOrderItem);
  }
}
