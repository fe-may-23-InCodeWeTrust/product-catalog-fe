import React from 'react';
import styles from './ContactsPage.module.scss';
import { contacts } from '../../utils/contacts';
import { BackButton } from '../../components/BackButton/BackButton';

export const ContactsPage = () => {
  return (
    <div className={styles['contacts_container']}>
      <div>
        <BackButton />
      </div>

      <h2 className={styles['title']}>Contacts</h2>

      <div className={styles['contacts_list']}>
        {contacts.map(contact => (
          <div key={contact.id} className={styles['contact_card']}>
            <div className={`${styles['contact_photo']} ${styles['bg-' + contact.id]}`}></div>

            <p className={styles['contact_name']}>
              {contact.fullName}
            </p>

            <p className={styles['contact_info']}>
              <a href={contact.linkedIn}>LinkedIn</a>
            </p>

            <p className={styles['contact_info']}>
              <a href={contact.gitHub}>Github</a>
            </p>

            <p className={styles['contact_info']}>
              <a href={`mailto:${contact.email}`}>Email</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
