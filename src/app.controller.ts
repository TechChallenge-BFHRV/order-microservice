import { Controller, Body } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

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
  update(id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.appService.update(+id, updateOrderDto);
  }

  @MessagePattern('delete_order')
  remove(id: string) {
    return this.appService.remove(+id);
  }
}
