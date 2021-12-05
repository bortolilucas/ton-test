import axiosApi from './axiosApi';
import { Endpoints } from './constants';

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type FetchProductsParamsType = {
  page: number;
};

type FetchProductsResponseType = {
  products?: ProductType[];
  previous?: number;
  current?: number;
  next?: number;
  limit?: number;
  errorMessage?: string;
};

export const fetchProducts = async (params: FetchProductsParamsType) => {
  try {
    const response = await axiosApi.get<FetchProductsResponseType>(
      Endpoints.PRODUCTS,
      { params },
    );

    return Promise.resolve(response);
  } catch (error: unknown) {
    return Promise.reject({ errorMessage: (error as Error).message });
  }
};
