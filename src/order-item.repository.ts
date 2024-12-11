import { OrderItem } from './entities/order-items.entity';
import { Repository } from './repository';

export abstract class OrderItemRepository extends Repository<OrderItem> {
  abstract create(orderItem: OrderItem): Promise<OrderItem>;
  abstract setOrderItemId(orderItemId: number): Promise<OrderItem>;
}
