import React, { useContext } from "react";
import { Product } from "../../utils/Types/Product"
import styles from './ProductList.module.scss';
import { ProductCard } from "../ProductCard";
import { CatalogContext } from "../../context/CatalogContext";
import { JellyTriangle } from '@uiball/loaders';

interface Props {
  products: Product[],
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  const { isLoading } = useContext(CatalogContext);

  return (
    <div className={styles['phone_cards']}>
      {isLoading ?  
      (<div className={styles['loader_container']}>
        <JellyTriangle size={100} speed={1.75} color="black" />
      </div>
    ) : (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) 
  }
  </div>
  )
}