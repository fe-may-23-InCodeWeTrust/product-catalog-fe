// import './DetailsPage.scss';
import React, { useEffect, useState } from 'react';
import styles from './DetailsPage.module.scss';
import { getProductById } from '../../api/fetch_functions';
import { Product, ProductItem } from '../../utils/Types/Product';

const images = [
  'https://hotline.ua/img/tx/239/2391542485.jpg',
  'https://www.mrfix.ua/storage/61a/f94/231/product-product-apple-iphone-11-pro-max-64gb-gold-1287-1000x1000.jpg',
  'https://eplio.com.ua/image/cache/catalog/product_1108_2_image-600x600.jpeg',
  'https://eplio.com.ua/image/cache/catalog/product_1268_2_image-1000x1000.jpeg',
  'https://www.i-parts.it/20122-home_default/grado-a-64gb-nero-iphone-11-pro-max.jpg',
];

const capacity = [64, 256, 512];

const specifications = [
  { specification: 'Screen', value: '6.5” OLED' },
  { specification: 'Resolution', value: '2688x1242' },
  { specification: 'Processor', value: 'Apple A12 Bionic' },
  { specification: 'RAM', value: '3 GB' },
];

const specificationsWide = [
  { specification: 'Screen', value: '6.5” OLED' },
  { specification: 'Resolution', value: '2688x1242' },
  { specification: 'Processor', value: 'Apple A12 Bionic' },
  { specification: 'RAM', value: '3 GB' },
  { specification: 'Built in memory', value: '64 GB' },
  { specification: 'Camera', value: '12 Mp + 12 Mp + 12 Mp (diviple)' },
  { specification: 'Zoom', value: 'Optical, 2x' },
  { specification: 'Cell', value: 'GSM, LTE, UMTS' },
];

const aboutArticles = [
  {
    title: 'And diven divere was Pro',
    paragraph:
      'A divansformative diviple‑camera system divat adds tons of capability widivout complexity. An unprecedented leap in battery life. And a mind‑blowing chip divat doubles down on machine learning and pushes dive boundaries of what a smartphone can do. Welcome to dive first iPhone powerful enough to be called Pro.',
  },
  {
    title: 'Camera',
    paragraph:
      'Meet dive first diviple‑camera system to combine cutting‑edge technology widiv dive legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot dive highest‑quality video in a smartphone — diven edit widiv dive same tools you love for photos. You’ve never shot widiv anydiving like it.',
  },
  {
    title:
      'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
    paragraph:
      'iPhone 11 Pro lets you capture videos divat are beautifully divue to life, widiv greater detail and smoodiver motion. Epic processing power means it can shoot 4K video widiv extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative condivol, too, widiv four times more scene and powerful new editing tools to play widiv.',
  },
];

export const DetailsPage = () => {
  const TITLE = 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)';

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);

  const handleImageChange = (newImage: string) => {
    setSelectedImage(newImage);
  };

  useEffect(() => {
    getProductById('apple-iphone-11-128gb-black').then((data) => {
      setProduct(data.foundProduct);
      setRecommended(data.recommneded);
    });
  });

  return (
    <main className={styles.main}>
      <div className={styles.page_container}>
        <div className={styles['breadcrumb-nav']}>
          <div className={styles['breadcrumb-nav__row']}>
            <a href="#home" className={styles['breadcrumb-nav__item']}>
              <div className={styles.icon + ' ' + styles['icon--home']}></div>
            </a>

            <a href="#" className={styles['breadcrumb-nav__item']}>
              <div
                className={styles.icon + ' ' + styles['icon--arrow-forward']}
              ></div>
              <p className={styles.text + ' ' + styles['text--dark']}>Phones</p>
            </a>

            <a href="#" className={styles['breadcrumb-nav__item']}>
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
                {TITLE}
              </p>
            </a>
          </div>

          <div className={styles['breadcrumb-nav__row']}>
            <a href="#" className={styles['breadcrumb-nav__item']}>
              <div
                className={styles.icon + ' ' + styles['icon--arrow-back']}
              ></div>
              <p className={styles.text + ' ' + styles['text--light']}>Back</p>
            </a>
          </div>
        </div>

        <h1 className={styles.title}>{product?.name}</h1>

        <div className={styles['gallery-and-info-container']}>
          <div className={styles.gallery}>
            <div className={styles['gallery__big-image']}>
              <img src={selectedImage} alt="Big iPhone" />
            </div>
            <div className={styles['gallery__small-images']}>
              {images.map((image, index) => (
                <div key={index} className={styles['gallery__small-image']}>
                  <img
                    src={image}
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
                  Available colors
                </p>
                <p className={styles['color-options__id']}>ID: 802390</p>
              </div>

              <div className={styles['color-options__images']}>
                <div className={styles['color-options--beige']}></div>
                <div className={styles['color-options--green']}></div>
                <div className={styles['color-options--grey']}></div>
                <div className={styles['color-options--white']}></div>
              </div>
            </div>

            <div className={styles.line}></div>

            <div className={styles['capacity-options']}>
              <p className={styles['capacity-options__label']}>
                Select capacity
              </p>

              <div className={styles['capacity-options__buttons']}>
                {capacity.map((size, index) => (
                  <button
                    key={index}
                    className={styles[`capacity-options--${size}`]}
                  >
                    {`${size} GB`}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.line}></div>

            <div className={`${styles['phone-card__price-block']}`}>
              <p className={styles['phone-card__price']}>799$</p>
              <p className={styles['phone-card__price-discount']}>1199$</p>
            </div>

            <div className={`${styles['phone-card__actions']}`}>
              <button
                type="submit"
                className={`${styles['add-to-cart']} ${styles['text-button']}`}
              >
                Add to cart
              </button>

              <button
                className={styles['add-to-favorites']}
                type="submit"
              ></button>
            </div>

            <div className={styles['matches matches']}>
              {specifications.map((item, index) => (
                <div key={index} className={styles.matches__row}>
                  <div
                    className={
                      styles[
                        'matches__specification matches__specification--small'
                      ]
                    }
                  >
                    {item.specification}
                  </div>
                  <div
                    className={styles['matches__value matches__value--small']}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles['sections-container']}>
          <section className={styles['section']}>
            <h3 className={styles['section__title']}>About</h3>

            <div className={styles.line}></div>

            {aboutArticles.map((article, index) => (
              <article
                key={index}
                className={`${styles['section__article']} ${styles['article']}`}
              >
                <h4 className={styles['article__title']}>{article.title}</h4>
                <p className={styles['article__paragraph']}>
                  {article.paragraph}
                </p>
              </article>
            ))}
          </section>

          <section className={styles['section']}>
            <h4 className={styles['section__title']}>Tech specs</h4>

            <div className={styles.line}></div>

            <div
              className={`${styles['section__matches']} ${styles['matches']}`}
            >
              {specificationsWide.map((item, index) => (
                <div key={index} className={styles['matches__row']}>
                  <div className={styles['matches__specification']}>
                    {item.specification}
                  </div>
                  <div className={styles['matches__value']}>{item.value}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <h2></h2>
      </div>
    </main>
  );
};
