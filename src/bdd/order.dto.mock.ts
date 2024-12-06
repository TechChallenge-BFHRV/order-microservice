import { CreateOrderDto, UpdateOrderDto, OrderItemDto } from '../order.dto';
import { Status, Step } from '@prisma/client';

// Mock de OrderItemDto
export const mockOrderItem = (
  overrides?: Partial<OrderItemDto>,
): OrderItemDto => ({
  itemId: 1,
  isActive: true,
  ...overrides,
});

// Mock de CreateOrderDto
export const mockCreateOrderDto = (
  overrides?: Partial<CreateOrderDto>,
): CreateOrderDto => ({
  totalPrice: 100,
  finalPrice: 90,
  preparationTime: 30,
  status: Status.PENDING,
  step: Step.START,
  customerId: 123,
  orderItems: [mockOrderItem()],
  ...overrides,
});

// Mock de UpdateOrderDto
export const mockUpdateOrderDto = (
  overrides?: Partial<UpdateOrderDto>,
): UpdateOrderDto => ({
  totalPrice: 120,
  finalPrice: 110,
  preparationTime: 40,
  status: Status.IN_PROGRESS,
  step: Step.COMPLETED,
  customerId: 123,
  orderItems: [mockOrderItem({ itemId: 2 })],
  ...overrides,
});
