import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderRepository } from './order.repository';
import { Order } from '@prisma/client';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Order): Promise<Order> {
    return this.prisma.order.create({
      data,
      include: {
        orderItems: true,
      },
    });
  }

  async update(id: number, data: Order): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        orderItems: {
          update: [],
          create: [],
          delete: [],
        }
      }
    });
  }

  async getById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
  }

  async getAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
