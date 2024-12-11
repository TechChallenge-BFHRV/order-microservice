import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { HttpStatus } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { AddItemToOrderUseCase } from './usecases/order-items/add-item-to-order.usecase';
import { AddItemToOrderDTO } from './add-item-to-order-dto';

@Injectable()
export class AppService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderRepository: OrderRepository,
    private readonly addItemToOrderUseCase: AddItemToOrderUseCase,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderCreated = await this.createOrderUseCase.execute(createOrderDto);
    return orderCreated;
  }

  async findAll() {
    const allOrders = await this.orderRepository.getAll();
    const allOrdersData = allOrders.map((el: Order) => {
      const estimatedTime = el
        ? new Date(
            el.InProgressTimestamp?.getTime() + el.preparationTime * 1000,
          )
        : null;

      return {
        id: el.id,
        totalPrice: el.totalPrice,
        status: el.status,
        step: el.step,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        customerId: el.customerId,
        InProgressTimestamp: el.InProgressTimestamp,
        finalPrice: el.finalPrice,
        preparationTime: el.preparationTime,
        orderItems: el?.orderItems?.map((orderItem) => {
          return { ...orderItem };
        }),
      };
    });
    return allOrdersData;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.getById(id);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderUpdated = await this.updateOrderUseCase.execute(id, updateOrderDto);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Order updated successfully',
      data: orderUpdated,
    };
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  async addToCart(orderItem: AddItemToOrderDTO) {
    const itemAdded = await this.addItemToOrderUseCase.execute(orderItem);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item added to order successfully',
      data: itemAdded,
    };
  }
}
