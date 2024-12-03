export const ordersArray = [
  {
    id: 1,
    totalPrice: 20,
    finalPrice: 20,
    preparationTime: 20,
    status: 'IN_PROGRESS',
    step: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
    InProgressTimestamp: new Date(),
    customerId: 1,
    orderItems: [
      {
        id: 1,
        quantity: 1,
        price: 20,
        orderId: 1,
        productId: 1,
      },
    ],
  },
  {
    id: 2,
    totalPrice: 30,
    finalPrice: 30,
    preparationTime: 30,
    status: 'IN_PROGRESS',
    step: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
    InProgressTimestamp: new Date(),
    customerId: 2,
    orderItems: [
      {
        id: 2,
        quantity: 1,
        price: 30,
        orderId: 2,
        productId: 2,
      },
    ],
  },
];
