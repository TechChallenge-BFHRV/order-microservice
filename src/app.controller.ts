import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';

@Controller('orders')
export class AppController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderRepository: OrderRepository,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderRepository.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderRepository.getById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.updateOrderUseCase.execute(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderRepository.delete(+id);
  }
}
