import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  handleOffset: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
  sortBy: string;
  sortByNumber: string;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handleOffset,
  limit,
  sortBy,
  sortByNumber,
}) => {
  const prevButton = '<';
  const nextButton = '>';

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  pages = pages.filter(page => (currentPage - 1) <= page && (page <= currentPage + 1));

  return (
    <div className={styles['pagination']}>
      {currentPage > 1 && (
        <NavLink
          to={`?page=${currentPage - 1}&sortBy=${sortBy}&items=${sortByNumber}`}
          className={`${styles['page-button']} ${styles['left']}`}
          onClick={() => {
            handleOffset(`${currentPage * limit - 2 * limit}`);
          }}
        >
          {prevButton}
        </NavLink>
      )}

      {!pages.includes(1) && (
        <>
          <NavLink
            key={1}
            to={`?page=${1}&sortBy=${sortBy}&items=${sortByNumber}`}
            className={classNames(styles['page-button'], {
              [styles['is-active']]: currentPage === 1,
            })}
            onClick={() => {
              handleOffset(`${limit * (1 - 1)}`);
            }}
          >
            1
          </NavLink>
          ...
        </>
      )}

      {pages.map(page => (
        <NavLink
          key={page}
          to={`?page=${page}&sortBy=${sortBy}&items=${sortByNumber}`}
          className={classNames(styles['page-button'], {
            [styles['is-active']]: currentPage === page,
          })}
          onClick={() => {
            handleOffset(`${limit * (page - 1)}`);
          }}
        >
          {page}
        </NavLink>
      ))}

      {!pages.includes(totalPages) && (
        <>
          ...
          <NavLink
            key={totalPages}
            to={`?page=${totalPages}&sortBy=${sortBy}&items=${sortByNumber}`}
            className={classNames(styles['page-button'], {
              [styles['is-active']]: currentPage === totalPages,
            })}
            onClick={() => {
              handleOffset(`${limit * (totalPages - 1)}`);
            }}
          >
            {totalPages}
          </NavLink>
        </>
      )}

      {currentPage < totalPages && (
        <NavLink
          to={`?page=${currentPage + 1}&sortBy=${sortBy}&items=${sortByNumber}`}
          className={`${styles['page-button']} ${styles['right']}`}
          onClick={() => {
            handleOffset(`${currentPage * limit}`);
          }}
        >
          {nextButton}
        </NavLink>
      )}
    </div>
  );
};
