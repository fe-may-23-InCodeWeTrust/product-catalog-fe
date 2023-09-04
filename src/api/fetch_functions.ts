import { Product } from '../utils/Types/Product';
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
