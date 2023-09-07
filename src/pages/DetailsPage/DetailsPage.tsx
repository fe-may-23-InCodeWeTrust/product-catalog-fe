import React, { useContext, useEffect, useState } from 'react';
import styles from './DetailsPage.module.scss';
import { Product, ProductItem } from '../../utils/Types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CatalogContext } from '../../context/CatalogContext';
import * as ProductService from '../../api/fetch_functions';
import classNames from 'classnames';
import { JellyTriangle } from '@uiball/loaders';
import { useLocation, Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoriteReducer';
import { useTranslation } from 'react-i18next';

const colorMap: { [key: string]: string } = {
  gold: '#FCDBC1',
  midnightgreen: '#5F7170',
  spacegray: '#4C4C4C',
  coral: '#FF7F50',
  silver: '#F0F0F0',
  black: '#0F0F11',
  green: '#CAEBCA',
  yellow: '#ECEC7F',
  white: '#f0f0f0',
  purple: '#C7ACC7',
  red: '#D45050',
  spaceblack: '#0E0E10',
  midnight: '#191970',
  sierrablue: '#1887A0',
  graphite: '#333333',
  blue: '#6699CC',
  pink: '#FFC0CB',
};

export const DetailsPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [productByItemId, setProductByItemId] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const { isLoading, setIsLoading } = useContext(CatalogContext);
  const [error, setError] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { t } = useTranslation();

  const category = location.pathname.slice(1).split('/')[0];
  const id = location.pathname.slice(1).split('/')[1];

  const handleGoBack = () => {
    window.history.back();
  };

  const favoritesGoods = useSelector(
    (state: RootState) => state.favorites.favoriteGoods,
  );

  const addTofavoritesButtonCondition = favoritesGoods.find(
    (good) => good.itemId === product?.id,
  );

  const goodsFromCart = useSelector((state: RootState) => state.cart.goods);
  const isInCart = goodsFromCart.find(
    (good) => good.id === productByItemId?.id,
  );

  const addToCartButtonCondition = goodsFromCart.find(
    (good) => good.itemId === product?.id,
  );

  const dispatch = useDispatch<AppDispatch>();

  const toggleFavorites = (product: Product) => {
    const foundedGood = favoritesGoods.find((good) => good.id === product.id);

    if (foundedGood) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const addProductToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        count: 1,
      }),
    );
  };

  const handleImageChange = (newImage: string) => {
    setSelectedImage(newImage);
  };

  const handleChangingCapacity = (capacity: string) => {
    return `/${category}/${product?.namespaceId}-${capacity.toLowerCase()}-${product?.color.toLowerCase()}`;
  };

  const handleChangingColor = (color: string) => {
    return `/${category}/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${color.toLowerCase()}`;
  };

  useEffect(() => {
    setIsLoading(true);

    ProductService.getProductById(location.pathname.slice(1))
      .then((data) => {
        setProduct(data.foundProduct);
        setRecommended(data.recommended);

        const images = `${data.foundProduct.images}`.slice(1, -1).split(',');
        const colors = `${data.foundProduct.colorsAvailable}`
          .slice(1, -1)
          .split(',');

        setImages(images);
        setColors(colors);
        setSelectedImage(images[0]);
        setSelectedColor(data.foundProduct.color);

        setSelectedCapacity(data.foundProduct.capacity);
      })
      .catch(() => setError('Wrong URL - could not make a request'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (product) {
    ProductService.getProductByItemId(product.id)
      .then((data) => {
        setProductByItemId(data);
      })
      .catch(() => setError('Wrong URL - could not make a request'));
  }

  const capacity = `${product?.capacityAvailable}`.slice(1, -1).split(',');

  return (
    <main className={styles.main}>
      <div className={styles.page_container}>
        <div className={styles['breadcrumb-nav']}>
          <div className={styles['breadcrumb-nav__row']}>
            <a href="#" className={styles['breadcrumb-nav__item']}>
              <div className={styles.icon + ' ' + styles['icon--home']}></div>
            </a>

            <a href={`#${category}`} className={styles['breadcrumb-nav__item']}>
              <div
                className={styles.icon + ' ' + styles['icon--arrow-forward']}
              ></div>
              <p className={styles.text + ' ' + styles['text--dark']}>
                {' '}
                {t(`${category}`)}
              </p>
            </a>

            <div className={styles['breadcrumb-nav__item']}>
              <div
                className={styles.icon + ' ' + styles['icon--arrow-forward']}
              ></div>
              <p
                className={
                  styles.text +
                  ' ' +
                  styles['text--light'] +
                  ' ' +
                  styles['text--truncate']
                }
              >
                {product?.name}
              </p>
            </div>
          </div>

          <div className={styles['breadcrumb-nav__row']}>
            <a
              href="#"
              className={styles['breadcrumb-nav__item']}
              onClick={handleGoBack}
            >
              <div
                className={styles.icon + ' ' + styles['icon--arrow-back']}
              ></div>
              <p className={styles.text + ' ' + styles['text--light']}>
                Back
              </p>
            </a>
          </div>
        </div>

        {isLoading ? (
          <div className={styles['loader_container']}>
            <JellyTriangle size={100} speed={1.75} color="black" />
          </div>
        ) : (
          <>
            <h1 className={styles.title}>{product?.name}</h1>

            <div className={styles['gallery-and-info-container']}>
              <div className={styles.gallery}>
                <div className={styles['gallery__big-image']}>
                  <img
                    src={`https://product-catalog-be-lf4l.onrender.com/${selectedImage}`}
                    alt="Big iPhone"
                  />
                </div>
                <div className={styles['gallery__small-images']}>
                  {images.map((image, index) => (
                    <div key={index} className={styles['gallery__small-image']}>
                      <img
                        src={`https://product-catalog-be-lf4l.onrender.com/${image}`}
                        alt={`Small iPhone ${index + 1}`}
                        onClick={() => handleImageChange(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles['info-container']}>
                <div className={styles['color-options']}>
                  <div className={styles['color-options__text']}>
                    <p className={styles['color-options__label']}>
                      {t('availableColors')}
                    </p>
                    <p
                      className={styles['color-options__id']}
                    >{`ID: ${productByItemId?.id}`}</p>
                  </div>

                  <div className={styles['color-options__images']}>
                    {colors.map((color) => (
                      <div
                        key={color}
                      >
                        <Link to={{ pathname: handleChangingColor(color) }}>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="28"
                              height="28"
                              rx="14"
                              fill={colorMap[color]}
                              stroke="white"
                              strokeWidth="2"
                            />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="31"
                              height="31"
                              rx="15.5"
                              stroke={
                                selectedColor === color ? '#0F0F11' : '#E2E6E9'
                              }
                            />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.line}></div>

                <div className={styles['capacity-options']}>
                  <p className={styles['capacity-options__label']}>
                    {t('selectCapacity')}
                  </p>

                  <div className={styles['capacity-options__buttons']}>
                    {capacity.map((size) => (
                      <Link
                        key={size}
                        to={{ pathname: handleChangingCapacity(size) }}
                        className={classNames(
                          styles['capacity-options__option'],
                          {
                            [styles['capacity-options__option--selected']]:
                              selectedCapacity === size,
                            [styles['capacity-options__option--not-selected']]:
                              selectedCapacity !== size,
                          },
                        )}
                      >
                        {size.replace(/(\d)([A-Za-z])/g, '$1 $2')}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.line}></div>

                <div className={`${styles['phone-card__price-block']}`}>
                  <p
                    className={styles['phone-card__price']}
                  >{`${product?.priceDiscount}$`}</p>
                  <p
                    className={styles['phone-card__price-discount']}
                  >{`${product?.priceRegular}$`}</p>
                </div>

                <div className={`${styles['phone-card__actions']}`}>
                  <button
                    type="submit"
                    className={classNames(
                      'text-button',
                      `${styles['add-to-cart']}`,
                      {
                        'added-to-cart': addToCartButtonCondition,
                      },
                    )}
                    onClick={() => {
                      if (productByItemId) {
                        addProductToCart(productByItemId);
                      }
                    }}
                    disabled={!!isInCart}
                  >
                    {t('addToCart')}
                  </button>

                  <button
                    className={classNames(styles['add-to-favorites'], {
                      'added-to-favorites': addTofavoritesButtonCondition,
                    })}
                    type="submit"
                    onClick={() => {
                      toggleFavorites(productByItemId as Product);
                    }}
                  ></button>
                </div>

                <div className={styles.matches}>
                  <div className={styles['matches__row']}>
                    <div
                      className={
                        styles['matches__specification'] +
                        ' ' +
                        styles['matches__specification--small']
                      }
                    >
                      Screen
                    </div>
                    <div
                      className={
                        styles['matches__value'] +
                        ' ' +
                        styles['matches__value--small']
                      }
                    >
                      {product?.screen}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div
                      className={
                        styles['matches__specification'] +
                        ' ' +
                        styles['matches__specification--small']
                      }
                    >
                      Resolution
                    </div>
                    <div
                      className={
                        styles['matches__value'] +
                        ' ' +
                        styles['matches__value--small']
                      }
                    >
                      {product?.resolution}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div
                      className={
                        styles['matches__specification'] +
                        ' ' +
                        styles['matches__specification--small']
                      }
                    >
                      Processor
                    </div>
                    <div
                      className={
                        styles['matches__value'] +
                        ' ' +
                        styles['matches__value--small']
                      }
                    >
                      {product?.processor}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div
                      className={
                        styles['matches__specification'] +
                        ' ' +
                        styles['matches__specification--small']
                      }
                    >
                      RAM
                    </div>
                    <div
                      className={
                        styles['matches__value'] +
                        ' ' +
                        styles['matches__value--small']
                      }
                    >
                      {product?.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['sections-container']}>
              <section className={styles['section']}>
                <h3 className={styles['section__title']}>{t('about')}</h3>

                <div className={styles.line}></div>

                {product?.description.map((article, index) => (
                  <article
                    key={index}
                    className={`${styles['section__article']} ${styles['article']}`}
                  >
                    <h4 className={styles['article__title']}>
                      {article.title}
                    </h4>
                    <p className={styles['article__paragraph']}>
                      {article.text}
                    </p>
                  </article>
                ))}
              </section>

              <section className={styles['section']}>
                <h4 className={styles['section__title']}>{t('techSpecs')}</h4>

                <div className={styles.line}></div>

                <div
                  className={`${styles['section__matches']} ${styles['matches']}`}
                >
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>
                      Screen
                    </div>
                    <div className={styles['matches__value']}>
                      {product?.screen}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>
                      Resolution
                    </div>
                    <div className={styles['matches__value']}>
                      {product?.resolution}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>
                      Processor
                    </div>
                    <div className={styles['matches__value']}>
                      {product?.processor}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>RAM</div>
                    <div className={styles['matches__value']}>
                      {product?.ram}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>
                      Built in memory
                    </div>
                    <div className={styles['matches__value']}>
                      {product?.capacity}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>
                      Camera
                    </div>
                    <div className={styles['matches__value']}>
                      {product?.camera}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>Zoom</div>
                    <div className={styles['matches__value']}>
                      {product?.zoom}
                    </div>
                  </div>
                  <div className={styles['matches__row']}>
                    <div className={styles['matches__specification']}>Cell</div>
                    <div className={styles['matches__value']}>
                      {product?.cell}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <ProductsSlider
              sliderTitle={t('youMayAlsoLike')}
              products={recommended}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </main>
  );
};
