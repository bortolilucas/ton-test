import type { ProductType } from '../../api';

export const makeMockProduct = (
  id: number,
  product?: Partial<ProductType>,
): ProductType => ({
  id,
  title: 'Mock Title',
  price: 200,
  description: 'Mock description',
  category: 'Mock category',
  image: 'https://fakestorecom/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
  ...product,
});

export const ProductsMockData = {
  baseItem: makeMockProduct(1),
  emptyItem: {
    id: -1,
    title: '',
    price: 0,
    empty: true,
  },
  oddLengthResponse: {
    products: [makeMockProduct(1)],
    current: 1,
  },
  evenLengthResponse: {
    products: [
      makeMockProduct(1),
      makeMockProduct(2),
      makeMockProduct(3),
      makeMockProduct(4),
    ],
    current: 1,
  },
  emptyResponse: {
    products: [],
    current: 1,
  },
  firstPageResponse: {
    products: [makeMockProduct(1), makeMockProduct(2)],
    current: 1,
    next: 2,
  },
  secondPageResponse: {
    products: [makeMockProduct(3), makeMockProduct(4)],
    current: 2,
  },
};
