import axiosApi from './axiosApi';
import { Endpoints } from './constants';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
  empty?: boolean;
};

export type FetchProductsParamsType = {
  page: number;
  limit?: number;
  search?: string;
};

export type FetchProductsResponseType = {
  products?: ProductType[];
  previous?: number;
  current?: number;
  next?: number;
  limit?: number;
};

export const fetchProducts = async (
  params: FetchProductsParamsType,
): Promise<FetchProductsResponseType> => {
  try {
    const response = await axiosApi.get<FetchProductsResponseType>(
      Endpoints.PRODUCTS,
      { params },
    );

    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};
