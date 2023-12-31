/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import '../../styles/_typography.scss';
import Select from 'react-select';
import { Product } from '../../utils/Types/Product';
import * as ProductService from '../../api/fetch_functions';
import { Pagination } from '../../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../context/CatalogContext';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useTranslation } from 'react-i18next';

export const CatalogPage: React.FC = () => {
  const { isLoading, setIsLoading } = useContext(CatalogContext);
  const location = useLocation();
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? +pageParams : 1;
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  useEffect(() => {
    setOffset(`${(currentPage - 1) * 16}`);
  }, [currentPage]);

  const [offset, setOffset] = useState(`${(currentPage - 1) * 16}`);
  const { t } = useTranslation();

  const categories = [
    { value: 'newest', label: `${t('newest')}` },
    { value: 'popular', label: `${t('popular')}` },
    { value: 'cheapest', label: `${t('cheapest')}` },
  ];

  const numbers = [
    { value: 16, label: 16 },
    { value: 24, label: 24 },
    { value: 32, label: 32 },
  ];

  const pageSortParams = searchParams.get('sortBy');
  const sortBy = pageSortParams ? pageSortParams : 'newest';
  const currentSortText = categories.find(
    (category) => category.value === sortBy,
  );
  const [sortByText, setSortByText] = useState(currentSortText);

  const itemsPerPage = searchParams.get('items');
  const sortByNumber = itemsPerPage ? itemsPerPage : '16';

  const currentSortNumber = numbers.find(
    (number) => number.value === +sortByNumber,
  );
  const [sortByItems, setSortByItems] = useState(currentSortNumber);

  useEffect(() => {
    setSortByItems(currentSortNumber);
  }, [sortByNumber, t]);

  useEffect(() => {
    setSortByText(currentSortText);
  }, [sortBy, t]);

  const category = location.pathname.slice(1);

  let catalogTitle;

  switch (category) {
    case 'accessories':
      catalogTitle = `${t('accessories')}`;
      break;
    case 'tablets':
      catalogTitle = `${t('tablets')}`;
      break;
    case 'phones':
      catalogTitle = `${t('phones')}`;
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

  const CustomStyleDark = {
    option: (defaultStyles: object, { isFocused }: any) => ({
      ...defaultStyles,
      backgroundColor: isFocused ? '#FAFBFC' : '#89939a',
      color: '#0f0f11',
    }),

    control: (defaultStyles: object) => ({
      ...defaultStyles,
      backgroundColor: '#89939a',
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
    ProductService.getProducts(
      category,
      offset,
      sortByNumber,
      sortBy.toLowerCase(),
    )
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
            to={`/${category}?page=1&sortBy=newest&items=16`}
            className={`${styles['icon__text']} text-small`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </div>

        <div className={styles['arcticle']}>
          <h1 className={styles['article--title']}>{catalogTitle}</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            {`${totalProducts} ${t('models')}`}
          </p>
        </div>
        <div className={styles['select']}>
          <p className={`${styles['select__sortByCategoryText']} text-small`}>
            {t('sortBy')}
          </p>

          <p className={`${styles['select__sortByNumberText']} text-small`}>
            {t('itemsOnPage')}
          </p>

          <Select
            className={styles['select__sortByCategory']}
            options={categories}
            styles={darkMode ? CustomStyleDark : CustomStyle}
            value={sortByText}
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
            styles={darkMode ? CustomStyleDark : CustomStyle}
            value={sortByItems}
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

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleOffset={setOffset}
            limit={+sortByNumber}
            sortBy={sortBy}
            sortByNumber={sortByNumber}
          />
        )}
      </div>
    </main>
  );
};
