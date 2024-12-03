import {
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status, Step } from '@prisma/client';

export class OrderItemDto {
  @IsNumber()
  itemId: number;

  @IsOptional()
  isActive?: boolean = true;
}

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsNumber()
  finalPrice?: number;

  @IsOptional()
  @IsNumber()
  preparationTime?: number;

  @IsEnum(Status)
  status: Status;

  @IsEnum(Step)
  step: Step;

  @IsNumber()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsNumber()
  finalPrice?: number;

  @IsOptional()
  @IsNumber()
  preparationTime?: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Step)
  step?: Step;

  @IsOptional()
  @IsNumber()
  customerId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems?: OrderItemDto[];
}
