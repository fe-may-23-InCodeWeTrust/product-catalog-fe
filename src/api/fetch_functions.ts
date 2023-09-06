import _ from 'lodash';
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

export const getProductsCount = async (category: string) => {
  const res = await client.get<{ count: number; rows: Product[] }>(
    `products?productType=${category}`,
  );

  return res.count;
};

export const getProductById = (path: string) => {
  return client.get<{ foundProduct: ProductItem; recommended: Product[] }>(
    `${path}`,
  );
};

export const getProductByItemId = (id: string) => {
  return client.get<Product>(`products/${id}`);
};

export const getAuthenticatedUser = (credentials: any) => {
  return client.get<{ token: string; user: string; id: string }>(
    `users/login`,
    credentials,
  );
};

export const createUser = (
  email: string,
  password: string,
  fullName: string,
) => {
  return client.post<{ message?: string; err?: string }>(`users/register`, '', {
    email,
    password,
    fullName,
  });
};

export const getFavorites = (userId: string) => {
  return client.get<string[]>(`users?userId=${userId}`);
}

export const updateFavorites = (productId: string, userId:string) => {
  return client.patch(`users/favorites?userId=${userId}`, '', { itemId: productId })
}