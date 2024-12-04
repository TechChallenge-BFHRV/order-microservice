import { defineFeature, loadFeature } from 'jest-cucumber';
import { AppService } from '../app.service';
import { OrderRepository } from '../order.repository';
import { CreateOrderUseCase } from '../usecases/create-order.usecase';
import { UpdateOrderUseCase } from '../usecases/update-order.usecase';
import { mockCreateOrderDto, mockUpdateOrderDto } from './order.dto.mock';

const feature = loadFeature('./src/bdd/features/app-service.feature');

defineFeature(feature, (test) => {
  let appService: AppService;
  let orderRepository: jest.Mocked<OrderRepository>;
  let createOrderUseCase: jest.Mocked<CreateOrderUseCase>;
  let updateOrderUseCase: jest.Mocked<UpdateOrderUseCase>;

  beforeEach(() => {
    orderRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    createOrderUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateOrderUseCase>;

    updateOrderUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateOrderUseCase>;

    appService = new AppService(
      createOrderUseCase,
      updateOrderUseCase,
      orderRepository,
    );
  });

  test('Create a new order', ({ given, when, then }) => {
    let createOrderDto: any;
    let result: any;

    given('a valid order payload', () => {
      createOrderDto = mockCreateOrderDto();
    });

    when('the create method is called', async () => {
      createOrderUseCase.execute.mockResolvedValue({
        id: 1,
        ...createOrderDto,
      });
      result = await appService.create(createOrderDto);
    });

    then('a new order should be created and returned', () => {
      expect(createOrderUseCase.execute).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual({ id: 1, ...createOrderDto });
    });
  });

  test('Update an order', ({ given, when, then }) => {
    let updateOrderDto: any;

    given('an order with ID 1 exists', () => {
      orderRepository.getById.mockResolvedValue({
        id: 1,
        totalPrice: 0,
        finalPrice: 0,
        preparationTime: 0,
        status: 'STARTED',
        step: 'START',
        createdAt: undefined,
        updatedAt: undefined,
        InProgressTimestamp: undefined,
        customerId: 0,
      });
    });

    given('a valid update payload', () => {
      updateOrderDto = mockUpdateOrderDto();
    });

    when('the update method is called with ID 1', async () => {
      updateOrderUseCase.execute.mockResolvedValue({
        id: 1,
        ...updateOrderDto,
      });
      await appService.update(1, updateOrderDto);
    });

    then('the order should be updated', () => {
      expect(updateOrderUseCase.execute).toHaveBeenCalledWith(
        1,
        updateOrderDto,
      );
    });
  });

  test('Remove an order', ({ given, when, then }) => {
    given('an order with ID 1 exists', () => {
      orderRepository.getById.mockResolvedValue({
        id: 1,
        totalPrice: 0,
        finalPrice: 0,
        preparationTime: 0,
        status: 'STARTED',
        step: 'START',
        createdAt: undefined,
        updatedAt: undefined,
        InProgressTimestamp: undefined,
        customerId: 0,
      });
    });

    when('the remove method is called with ID 1', async () => {
      await appService.remove(1);
    });

    then('the order should be deleted', () => {
      expect(orderRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  test('Find all orders', ({ given, when, then }) => {
    let result: any;

    given('the database has orders', () => {
      orderRepository.getAll.mockResolvedValue([
        {
          id: 1,
          totalPrice: 0,
          finalPrice: 0,
          preparationTime: 0,
          status: 'STARTED',
          step: 'START',
          createdAt: undefined,
          updatedAt: undefined,
          InProgressTimestamp: undefined,
          customerId: 0,
        },
      ]);
    });

    when('the findAll method is called', async () => {
      result = await appService.findAll();
    });

    then('all orders should be returned', () => {
      expect(orderRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 1,
          totalPrice: 0,
          finalPrice: 0,
          preparationTime: 0,
          status: 'STARTED',
          step: 'START',
          createdAt: undefined,
          updatedAt: undefined,
          InProgressTimestamp: undefined,
          customerId: 0,
        },
      ]);
    });
  });

  test('Find an order by ID', ({ given, when, then }) => {
    let result: any;

    given('the database has an order with ID 1', () => {
      orderRepository.getById.mockResolvedValue({
        id: 1,
        totalPrice: 0,
        finalPrice: 0,
        preparationTime: 0,
        status: 'STARTED',
        step: 'START',
        createdAt: undefined,
        updatedAt: undefined,
        InProgressTimestamp: undefined,
        customerId: 0,
      });
    });

    when('the findOne method is called with ID 1', async () => {
      result = await appService.findOne(1);
    });

    then('the order with ID 1 should be returned', () => {
      expect(orderRepository.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        id: 1,
        totalPrice: 0,
        finalPrice: 0,
        preparationTime: 0,
        status: 'STARTED',
        step: 'START',
        createdAt: undefined,
        updatedAt: undefined,
        InProgressTimestamp: undefined,
        customerId: 0,
      });
    });
  });
});
