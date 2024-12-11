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
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: orderCreated,
    };
  }

  async findAll() {
    const allOrders = await this.orderRepository.getAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all orders retrieved successfully',
      data: allOrders.map((el: Order) => {
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
          orderItems: el?.orderItems?.map((orderItem) => {
            return { orderItemId: orderItem.id, ...orderItem };
          }),
          estimatedTime: estimatedTime,
          minutesRemaining: estimatedTime
            ? Math.floor(
                (estimatedTime?.getTime() - new Date()?.getTime()) / 60000,
              )
            : null,
        };
      }),
    };
  }

  async findOne(id: number) {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Order with ID #${id} not found!`,
        data: order,
      };
    }
    const estimatedTime = order
      ? new Date(
          order.InProgressTimestamp?.getTime() + order.preparationTime * 1000,
        )
      : null;

    return {
      statusCode: HttpStatus.OK,
      message: `Order with ID #${id} retrieved successfully`,
      data: {
        ...order,
        estimatedTime: estimatedTime,
        minutesRemaining: estimatedTime
          ? Math.floor(
              (estimatedTime?.getTime() - new Date()?.getTime()) / 60000,
            )
          : null,
      },
    };
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
