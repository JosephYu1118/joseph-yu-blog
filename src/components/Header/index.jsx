import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Layout } from 'antd';

import useWindowSize from '@/hooks/useWindowSize';
import * as styles from './Header.module.scss';

const navigationList = [
  {
    path: '/',
    name: 'About',
  },
  {
    path: '/blog',
    name: 'Blog',
  },
  {
    path: '/tags',
    name: 'Tags',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [windowWidth] = useWindowSize();

  const toggleMenu = () => {
    if (windowWidth !== 0 && windowWidth <= 768) {
      setIsMenuVisible(!isMenuVisible);
    }
  };

  return (
    <div className={styles.header}>
      <button
        className={styles.menu}
        type="button"
        onClick={toggleMenu}
      >
        <div className={`${styles.container} ${isMenuVisible ? styles.active : ''}`}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.menuText}>MENU</div>
        </div>
      </button>
      <Layout className={`${styles.navigationBar} ${isMenuVisible ? styles.vertical : styles.hidden}`}>
        <div className={styles.container}>
          {navigationList.map(({ path, name }) => (
            <Link
              key={name}
              to={path}
              className={styles.navigationItem}
              activeClassName={styles.active}
              onClick={toggleMenu}
            >
              {name}
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Header;
