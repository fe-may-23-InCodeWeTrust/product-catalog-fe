import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const prevButton = '<';
  const nextButton = '>';

  const getPageButtons = () => {
    const buttons = [];
    const pagesToShow = 4;
    const start = Math.floor(Math.max(1, currentPage - (pagesToShow - 1) / 2));
    const end = Math.floor(
      Math.min(totalPages, currentPage + (pagesToShow - 1) / 2),
    );

    for (let i = start; i <= end; i++) {
      buttons.push(
        <NavLink
          key={i}
          to={`?page=${i}`}
          className={classNames(styles['page-button'], {
            [styles['is-active']]: currentPage === i,
          })}
        >
          {i}
        </NavLink>,
      );
    }

    return buttons;
  };

  return (
    <div className={styles['pagination']}>
      {currentPage > 1 && (
        <NavLink
          to={`?page=${currentPage - 1}`}
          className={`${styles['page-button']} ${styles['left']}`}
        >
          {prevButton}
        </NavLink>
      )}

      {getPageButtons()}

      {currentPage < totalPages && (
        <NavLink
          to={`?page=${currentPage + 1}`}
          className={`${styles['page-button']} ${styles['right']}`}
        >
          {nextButton}
        </NavLink>
      )}
    </div>
  );
};
