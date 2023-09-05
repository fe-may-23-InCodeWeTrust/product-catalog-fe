/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import '../../styles/_typography.scss';
import Select from 'react-select';
import { Product } from '../../utils/Types/Product';
import * as ProductService from '../../api/fetch_functions';
import { Pagination } from '../../components/Pagination/Pagination';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../context/CatalogContext';
import { ProductsList } from '../../components/ProductsList/ProductsList';

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

export const CatalogPage: React.FC = () => {
  const { setIsLoading } = useContext(CatalogContext);
  const location = useLocation();
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? +pageParams : 1;
  const [offset, setOffset] = useState(`${(currentPage - 1) * 16}`);

  const pageSortParams = searchParams.get('sortBy');
  const sortBy = pageSortParams ? pageSortParams : 'newest';

  const currentSortText =
    categories.find((category) => category.value === sortBy) || categories[0];
  const [sortByText, setSortByText] = useState(currentSortText);

  const itemsPerPage = searchParams.get('items');
  const sortByNumber = itemsPerPage ? itemsPerPage : '16';

  const currentSortNumber =
    numbers.find((number) => number.value === +sortByNumber) || numbers[0];
  const [sortByItems, setSortByItems] = useState(currentSortNumber);

  const category = location.pathname.slice(1);

  let catalogTitle;

  switch (category) {
    case 'accessories':
      catalogTitle = 'Accesories';
      break;
    case 'tablets':
      catalogTitle = 'Tablets';
      break;
    case 'phones':
      catalogTitle = 'Mobile phones';
      break;
    default:
      '';
      break;
  }

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
    setIsLoading(true);
    ProductService.getProducts(category, offset, sortByNumber, sortBy)
      .then((data) => {
        setProducts(data.rows);
        setTotalPages(Math.ceil(data.count / +sortByNumber));
        setTotalProducts(data.count);
      })
      .catch(() => setError('Wrong URL - could not make a request'))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({ top: 0 });
      });
  }, [sortByNumber, offset, category, sortBy, category]);

  return (
    <main className={styles['main']}>
      <div className={styles['container']}>
        <div className={styles['icons']}>
          <Link
            to={'/'}
            className={`${styles['icon']} ${styles['icon--home']}`}
          ></Link>

          <span className={`${styles['icon']} ${styles['icon--arrow']}`}></span>
          <Link
            to={`/${category}`}
            className={`${styles['icon__text']} text-small`}
          >
            {category}
          </Link>
        </div>

        <div className={styles['arcticle']}>
          <h1 className={styles['article--title']}>{catalogTitle}</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            {`${totalProducts} models`}
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
            defaultValue={sortByText}
            onChange={(event) => {
              if (event?.value) {
                setSearchParams(
                  `?page=1&sortBy=${event.value.toString()}&items=${sortByNumber}`,
                );
              }
              setOffset('0');
            }}
          />
          <Select
            className={styles['select__sortByNumber']}
            options={numbers}
            styles={CustomStyle}
            defaultValue={sortByItems}
            onChange={(event) => {
              if (event?.value) {
                setSearchParams(
                  `?page=${currentPage}&sortBy=${sortBy}&items=${event.value.toString()}`,
                );
              }
            }}
          />
        </div>

        {error && <div>There is some problems occured</div>}

        <ProductsList products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleOffset={setOffset}
          limit={+sortByNumber}
          sortBy={sortBy}
          sortByNumber={sortByNumber}
        />
      </div>
    </main>
  );
};
