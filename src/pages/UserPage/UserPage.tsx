import React, { useContext, useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/Types/Contact';
import { CatalogContext } from '../../context/CatalogContext';
import * as ProductProvider from '../../api/fetch_functions';

const UserPage = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { setFavoritesCount } = useContext(CatalogContext);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      navigate('/signin');
    }
    fetch(`https://product-catalog-be-lf4l.onrender.com/users/${id}`)
      .then((data) => data.json())
      .then((data) => setUser(data));

    ProductProvider.getFavorites(id as string).then((data) => {
      setFavoritesCount(data);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('userId');
    setFavoritesCount(() => []);
    navigate('/signin');
  };

  return (
    <div className={styles['user-container']}>
      {user && (
              <div className={styles['user-info']}>
              <div className={styles['user-img']}>
                <img
                  src="https://w7.pngwing.com/pngs/34/886/png-transparent-female-woman-girl-computer-icons-svg-face-people-logo.png"
                  alt=""
                />
              </div>
              <div className={styles['user-info-data']}>
                <div className={styles['user-info-credentials']}>
                  <div className={styles['user-info-name']}>
                    <div className={styles['user-info-name-label']}>Name:</div>
                    <div className={styles['user-info-name-text']}>
                      {user?.fullName}
                    </div>
                  </div>
                  <div className={styles['user-info-email']}>
                    <div className={styles['user-info-email-label']}>Email:</div>
                    <div className={styles['user-info-email-text']}>
                      {user?.email}
                    </div>
                  </div>
                </div>
                <button onClick={handleLogOut} className={styles['btn-log-out']}>
                  Log Out
                </button>
              </div>
            </div>
      )}
    </div>
  );
};

export default UserPage;
