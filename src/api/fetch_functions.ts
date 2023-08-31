import { Product } from '../utils/Types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = (category: string, offset: string, limit: string, order:string) => {
  return client.get<Product[]>(`products?productType=${category}&offset=${offset}&limit=${limit}&order=${order}`);
};