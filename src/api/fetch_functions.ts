import { Product, ProductItem } from '../utils/Types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = (
  category: string,
  offset: string,
  limit: string,
  order: string,
) => {
  return client.get<{ count: number; rows: Product[] }>(
    `products?productType=${category}&offset=${offset}&limit=${limit}&order=${order}`,
  );
};

export const getHotProducts = () => {
  return client.get<Product[]>(`products/discount`);
};

export const getNewProducts = () => {
  return client.get<Product[]>(`products/new`);
};

export const getProductById = (id: string) => {
  return client.get<{foundProduct: ProductItem, recommneded: Product[]}>(`phones/${id}`);
};

export const getAuthenticatedUser = (email: string, password: string) => {
  return client.get<{token: string, user: string, favorites: Product[]}>(`users/login`, {email, password})
}

export const createUser = (email: string, password: string, fullName: string) => {
  return client.post<{ message: string }>(`users/register`, {email, password, fullName})
}