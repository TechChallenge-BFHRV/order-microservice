import { Controller, Body } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AddItemToOrderDTO } from './add-item-to-order-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_order')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.appService.create(createOrderDto);
  }

  @MessagePattern('get_all_orders')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('get_order_by_id')
  findOne(id: string) {
    return this.appService.findOne(+id);
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
