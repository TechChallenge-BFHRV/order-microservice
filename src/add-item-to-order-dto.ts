import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddItemToOrderDTO {
  id: number;

  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  itemId: number;
}
