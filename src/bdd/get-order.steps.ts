import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { PrismaService } from '../prisma.service';
import { ordersArray } from './order-mock';
import { AppService } from '../app.service';
import { OrderRepository } from 'src/order.repository';
import { CreateOrderUseCase } from 'src/usecases/create-order.usecase';
import { UpdateOrderUseCase } from 'src/usecases/update-order.usecase';
import { PrismaOrderRepository } from 'src/order.prisma.repository';

const feature = loadFeature('./src/bdd/features/get-order.feature');

const db = {
  order: {
    create: jest.fn(),
    findMany: jest.fn().mockResolvedValue(ordersArray),
    findUnique: jest.fn().mockResolvedValue(ordersArray[1]),
  },
};

defineFeature(feature, (test) => {
  let prisma: PrismaService;

  beforeAll(async () => {});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: OrderRepository,
          useClass: PrismaOrderRepository,
        },
        CreateOrderUseCase,
        UpdateOrderUseCase,
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
  });

  test('Get order with valid data', ({ given, when, then }) => {
    let order;
    given('order by ID', () => {
      order = ordersArray[1];
    });

    when('I get the order by ID', async () => {
      await prisma.order.findUnique({ where: { id: order.id } });
    });

    then('I should get the order', () => {
      expect(prisma.order.findUnique).toHaveBeenCalled();
    });
  });
});
