import { Order } from './order.entity';

export class OrderItem {
  id?: number;
  orderId?: number;
  itemId?: number;
  isActive: boolean;
  order?: Order;
}
