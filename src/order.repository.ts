import { Order } from '@prisma/client';
import { Repository } from './repository';

export abstract class OrderRepository extends Repository<Order> {}
