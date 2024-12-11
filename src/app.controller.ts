import { Controller, Body, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AddItemToOrderDTO } from './add-item-to-order-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_order')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const res = await this.appService.create(createOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: res,
    };
  }

  @MessagePattern('get_all_orders')
  async findAll() {
    const allOrders = await this.appService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of a!!!ll orders retrieved successfully',
      data: allOrders,
    };
  }

  @MessagePattern('get_order_by_id')
  async findOne(id: string) {
    const order = await this.appService.findOne(+id);
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

  @MessagePattern('update_order')
  update(@Body() updateOrderDto: any) {
    return this.appService.update(updateOrderDto.order.id, updateOrderDto.order);
  }

  @MessagePattern('delete_order')
  remove(id: string) {
    return this.appService.remove(+id);
  }

  @MessagePattern('add_to_cart')
  addToCart(orderItem: AddItemToOrderDTO) {
    return this.appService.addToCart(orderItem);
  }
}
