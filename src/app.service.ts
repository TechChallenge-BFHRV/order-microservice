import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';

@Injectable()
export class AppService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderRepository: OrderRepository,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  findAll() {
    return this.orderRepository.getAll();
  }

  findOne(id: number) {
    return this.orderRepository.getById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.updateOrderUseCase.execute(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
