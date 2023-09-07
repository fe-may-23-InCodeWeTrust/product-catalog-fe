import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/cartReducer';
import { Product } from '../../utils/Types/Product';
import { useTranslation } from 'react-i18next';
import { Pagination } from '../../components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../context/CatalogContext';
import * as ProductProvider from '../../api/fetch_functions';

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { favoritesCount } = useContext(CatalogContext);
  const [favoriteGoods, setFavoriteGoods] = useState<Product[]>([]);
  const navigate = useNavigate()
  const userId = window.localStorage.getItem('userId');
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [totalPages, setTotalPages] = useState(0);
  // const pageParams = searchParams.get('page');
  // const currentPage = pageParams ? +pageParams : 1;

  const numberOfItems = favoritesCount.length;
  // useEffect(() => {
  //   setTotalPages(Math.ceil(numberOfItems / 16));
  // }, [numberOfItems]);

  useEffect(() => {
    if (!userId) {
      navigate('/singin');
    }
    Promise.all(
      favoritesCount.map((good) => ProductProvider.getProductByItemId(good)),
    ).then((data) => setFavoriteGoods(data as Product[]));
  }, [favoritesCount]);

  const addProductToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        count: 1,
      }),
    );
  };

  return (
    <main className={styles['main']}>
      <div className={styles['container']}>
        <div className={styles['icons']}>
          <a
            href="#home"
            className={`${styles['icon']} ${styles['icon--home']}`}
          ></a>

          <a href="#" className={`${styles['icon']} ${styles['icon--arrow']}`}>
            <p className={`${styles['icon__text']} text-small`}>
              {t('favorites')}
            </p>
          </a>
        </div>

        <div className={styles['article']}>
          <h1 className={styles['article--title']}>{t('favorites')}</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            {numberOfItems > 0 ? numberOfItems : ''}{' '}
            {numberOfItems > 0 ? t('models') : ''}
          </p>
        </div>

        {numberOfItems ? (
          <div className={styles['phone_cards']}>
            {favoriteGoods.length > 0 &&
              favoriteGoods.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addProductToCart}
                />
              ))}
          </div>
        ) : (
          <div className={styles['empty-favs']}>
            <img className={styles['empty-favs']} />
            <p className={styles['empty-favs_text']}>
              Press 💛 to add items to favorites
            </p>
          </div>
        )}
        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleOffset={setOffset}
            limit={16}
            sortBy={'newest'}
            sortByNumber={'16'}
          /> */}
      </div>
    </main>
  );
};

export const FavoritesPage = React.memo(Favorites);
