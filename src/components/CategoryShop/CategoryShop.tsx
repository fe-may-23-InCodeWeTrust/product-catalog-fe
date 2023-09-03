import React from 'react';
import './CategoryShop.scss';
import phonesImg from '../../assets/icons/phones.png';
import tabletsImg from '../../assets/icons/tablets.png';
import accessoriesImg from '../../assets/icons/accessories.png';
import { useNavigate } from 'react-router-dom';

const defaultSize = 90;

const categories = [
  {
    id: 1,
    title: 'Mobile phones',
    count: '95 models',
    img: phonesImg,
    background: '#6D6474',
    path: 'phones',
  },
  {
    id: 2,
    title: 'Tablets',
    count: '24 models',
    img: tabletsImg,
    background: '#8D8D92',
    path: 'tablets',
  },
  {
    id: 3,
    title: 'Accessories',
    count: '100 models',
    img: accessoriesImg,
    background: '#973D5F',
    path: 'accessories',
  },
];

export const CategoryShop = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="category-title">Shop by category</h1>
      <div className="container">
        {categories.map((category, index) => (
          <div key={category.id} onClick={() => navigate(category.path)}>
            <div
              className="category-card__background"
              style={{ background: category.background }}
            >
              <img
                style={{
                  width: `${defaultSize + index * 4}%`,
                  height: `${defaultSize + index * 4}%`,
                }}
                className="category-card__img"
                src={category.img}
                alt={category.title}
              />
            </div>
            <h2 className="category-card__title">{category.title}</h2>
            <h2 className="category-card__subtitle">{category.count}</h2>
          </div>
        ))}
      </div>
    </>
  );
};
