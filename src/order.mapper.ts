import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order, Status, Step } from '@prisma/client';

@Injectable()
export class OrderMapper {
  public static toEntity(dto: CreateOrderDto | UpdateOrderDto, existingOrder?: Order): any {
    if (existingOrder) {
      return {
        totalPrice: dto.totalPrice,
        finalPrice: dto.finalPrice,
        preparationTime: dto.preparationTime,
        status: dto.status,
        step: dto.step,
        customerId: dto.customerId,
        orderItems: dto.orderItems,
      };
    }

    return {
      totalPrice: dto.totalPrice,
      finalPrice: dto.finalPrice,
      preparationTime: dto.preparationTime,
      status: dto.status || Status.STARTED,
      step: dto.step || Step.START,
      customerId: dto.customerId,
      orderItems: {
        create: dto.orderItems?.map((item) => ({
          itemId: item.itemId,
          isActive: item.isActive,
        })),
      },
    };
  }

  toDto(entity: Order): CreateOrderDto {
    return {
      totalPrice: entity.totalPrice,
      finalPrice: entity.finalPrice,
      preparationTime: entity.preparationTime,
      status: entity.status,
      step: entity.step,
      customerId: entity.customerId,
      orderItems: [],
    };
  }
}
