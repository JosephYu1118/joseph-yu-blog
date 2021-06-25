import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub, faTwitter, faFacebook, faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import gatsbyConfig from '@/config/gatsbyConfig';
import * as styles from './Profile.module.scss';

const contactList = [
  {
    url: gatsbyConfig.contact.github,
    icon: faGithub,
  },
  {
    url: gatsbyConfig.contact.twitter,
    icon: faTwitter,
  },
  {
    url: gatsbyConfig.contact.facebook,
    icon: faFacebook,
  },
  {
    url: gatsbyConfig.contact.instagram,
    icon: faInstagram,
  },
];

const Profile = () => (
  <aside className={styles.profile}>
    <div className={styles.headshot} />
    <div className={styles.container}>
      <h2 className={styles.name}>俞敬聲</h2>
      <div className={`${styles.badge} ${styles.lightBlue}`}>Front-end Developer</div>
      <div className={styles.contactBlock}>
        {contactList.map(({ url, icon }) => (
          <a
            key={url}
            className={styles.link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
        ))}
      </div>
      <ul className={styles.infoBlock}>
        <li className={`${styles.infoItem}`}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <p>1992 / 04 / 27</p>
        </li>
        <li className={`${styles.infoItem}`}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <p className={styles.chinese}>台北市, 台灣</p>
        </li>
        <li className={`${styles.infoItem}`}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p>niceyoyo@gmail.com</p>
        </li>
      </ul>
      <a
        className={`${styles.badge} ${styles.deepBlue}`}
        href={gatsbyConfig.contact.cakeResume}
        target="_blank"
        rel="noopener noreferrer"
      >
        My CakeResume
      </a>
    </div>
  </aside>
);

export default Profile;
