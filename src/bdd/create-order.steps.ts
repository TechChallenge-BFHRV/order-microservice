import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { OrderRepository } from '../order.repository';
import { PrismaOrderRepository } from '../order.prisma.repository';
import { PrismaService } from '../prisma.service';
import { ordersArray } from './order-mock';
import { CreateOrderUseCase } from '../usecases/create-order.usecase';
import { CreateOrderDto } from '../order.dto';
import { AppService } from '../app.service';
import { UpdateOrderUseCase } from 'src/usecases/update-order.usecase';

const feature = loadFeature('./src/bdd/features/create-order.feature');

const db = {
  order: {
    create: jest.fn(),
    findMany: jest.fn().mockResolvedValue(ordersArray),
    findUnique: jest.fn().mockResolvedValue(ordersArray[1]),
  },
};

defineFeature(feature, (test) => {
  let createOrderUseCase: CreateOrderUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        CreateOrderUseCase,
        {
          provide: OrderRepository,
          useClass: PrismaOrderRepository,
        },
        AppService,
        {
          provide: PrismaService,
          useValue: db,
        },
        CreateOrderUseCase,
        UpdateOrderUseCase,
        OrderRepository,
      ],
    }).compile();
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    prisma = module.get<PrismaService>(PrismaService);
  });

  test('Create order with valid data', ({ given, when, then }) => {
    let order: CreateOrderDto;
    given('I have an order data', () => {
      order = {
        totalPrice: 20,
        finalPrice: 20,
        preparationTime: 20,
        customerId: 1,
        orderItems: [
          {
            itemId: 1,
            isActive: true,
          },
          {
            itemId: 2,
            isActive: true,
          },
        ],
      } as CreateOrderDto;
    });

    when('I create the order', async () => {
      await createOrderUseCase.execute(order);
    });

    then('I should get the order', () => {
      expect(prisma.order.create).toHaveBeenCalled();
    });
  });
});
