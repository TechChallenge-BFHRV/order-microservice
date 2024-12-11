import { OrderItem } from './entities/order-items.entity';
import { OrderItemData } from './order-item.interface';

export class OrderItemMapper {
  public static toEntity(raw: OrderItemData): OrderItem {
    return {
      id: raw.id,
      orderId: raw.orderId,
      itemId: raw.itemId,
      isActive: raw.isActive,
    };
  }

  public static toDTO(entity: OrderItem): OrderItem {
    return {
      id: entity.id,
      orderId: entity.orderId,
      itemId: entity.itemId,
      isActive: entity.isActive,
    };
  }
}
