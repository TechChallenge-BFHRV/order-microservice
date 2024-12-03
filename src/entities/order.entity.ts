import { Status, Step } from '@prisma/client';
import { OrderItem } from './order-items.entity';

export class Order {
  id?: number;
  totalPrice?: number;
  finalPrice?: number;
  preparationTime?: number;
  status: Status;
  step: Step;
  createdAt?: Date;
  updatedAt?: Date;
  InProgressTimestamp?: Date;
  customerId: number;
  orderItems?: OrderItem[];
}
