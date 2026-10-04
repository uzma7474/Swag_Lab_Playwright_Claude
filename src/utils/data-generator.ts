import { faker } from '@faker-js/faker';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Random-but-valid test data builders. */
export class DataGenerator {
  static checkoutInfo(overrides: Partial<CheckoutInfo> = {}): CheckoutInfo {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####'),
      ...overrides,
    };
  }
}
