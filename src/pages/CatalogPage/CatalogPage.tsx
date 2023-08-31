/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import '../../styles/_typography.scss';
import Select from 'react-select';
import { Card } from '../../components/PhoneCard';
import { CatalogContext } from '../../context/CatalogContext';
import { Product } from '../../utils/Types/Product';
import * as ProductService from '../../api/fetch_functions'
import { values } from 'lodash';

const categories = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'cheapest', label: 'Cheapest' },
];

const numbers = [
  { value: 16, label: 16 },
  { value: 24, label: 24 },
  { value: 32, label: 32 },
];

  type Props = {
  category: string;
  }

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const { catalogTitle, iconTitle } = useContext(CatalogContext);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('16')
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  const [order, setOrder] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const CustomStyle = {
    option: (defaultStyles: object, { isFocused }: any) => ({
      ...defaultStyles,
      backgroundColor: isFocused ? '#FAFBFC' : '#fff',
      color: '#0f0f11',
    }),

    control: (defaultStyles: object) => ({
      ...defaultStyles,
      backgroundColor: '#fff',
      borderRaduis: '8px',
      border: '0.5px solid #89939A',
      cursor: 'pointer',
      fontSize: '14px',
    }),
    singleValue: (defaultStyles: object) => ({
      ...defaultStyles,
      color: '#0f0f11',
    }),
  };

  useEffect(() => {
    ProductService.getProducts(category, offset, limit, sortBy)
      .then((data) => {
        setProducts(data);
      }).catch(() => setError('Wrong URL - could not make a request'));
  }, [limit, offset, category, sortBy]);

  return (
    <main className={styles['main']}>
      <div className={styles['container']}>
        <div className={styles['icons']}>
          <a
            href="#home"
            className={`${styles['icon']} ${styles['icon--home']}`}
          ></a>

          <a href="#" className={`${styles['icon']} ${styles['icon--arrow']}`}>
            <p className={`${styles['icon__text']} text-small`}>{category}</p>
          </a>
        </div>

        <div className={styles['arcticle']}>
          <h1 className={styles['article--title']}>{catalogTitle}</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            95 models
          </p>
        </div>

        <div className={styles['select']}>
          <p className={`${styles['select__sortByCategoryText']} text-small`}>
            Sort by
          </p>

          <p className={`${styles['select__sortByNumberText']} text-small`}>
            Items on page
          </p>
          <Select
            className={styles['select__sortByCategory']}
            options={categories}
            styles={CustomStyle}
            defaultValue={categories[0]}
            onChange={(event) => {
              if (event?.value) {
                setSortBy(event.value.toString())}
              }
            }
          />
          <Select
            className={styles['select__sortByNumber']}
            options={numbers}
            styles={CustomStyle}
            defaultValue={numbers[0]}
            onChange={(event) => {
              if (event?.value) {
                setLimit(event.value.toString())}
              }
            }
          />
        </div>

        <div className={styles['phone_cards']}>
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <div className={styles['pagination']}>Pagination</div>
      </div>
    </main>
  );
};
