import React, { useEffect } from 'react';
import styles from './ContactsPage.module.scss';
import { contacts } from '../../utils/contacts';
import { BackButton } from '../../components/BackButton/BackButton';
import { useTranslation } from 'react-i18next';

export const ContactsPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={styles['contacts_container']}>
      <div>
        <BackButton />
      </div>

      <h2 className={styles['title']}>{t('contacts')}</h2>

      <div className={styles['contacts_list']}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles['contact_card']}>
            <div
              className={`${styles['contact_photo']} ${
                styles['bg-' + contact.id]
              }`}
            ></div>

            <p className={styles['contact_name']}>{contact.fullName}</p>

            <p className={styles['contact_info']}>
              <a href={contact.linkedIn}>
                <img
                  src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"
                  className={styles['contact_icon']}
                  alt="LinkedIn"
                />
                LinkedIn
              </a>
            </p>

            <p className={styles['contact_info']}>
              <a href={contact.gitHub}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  className={styles['contact_icon']}
                  alt="Github"
                />
                Github
              </a>
            </p>

            <p className={styles['contact_info']}>
              <a href={`mailto:${contact.email}`}>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                  className={styles['contact_icon']}
                  alt="Email"
                />
                Email
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
