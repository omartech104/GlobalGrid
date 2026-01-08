// src/shipments/factories/shipment.factory.ts
import { faker } from '@faker-js/faker';
import { ShipmentStatus } from '../../common/constants/shipment.constants';

export const shipmentFactory = (overrides = {}) => ({
  trackingNumber: faker.string.alphanumeric(10).toUpperCase(),
  origin: `${faker.location.city()}, ${faker.location.country()}`,
  destination: `${faker.location.city()}, ${faker.location.country()}`,
  status: faker.helpers.arrayElement(Object.values(ShipmentStatus)),
  createdAt: faker.date.past(),
  ...overrides,
});
