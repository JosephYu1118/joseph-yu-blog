import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Layout } from 'antd';

import useWindowSize from '@/hooks/useWindowSize';
import * as styles from './header.module.scss';

const Header = () => {
  const [menu, setMenu] = useState(false);

  const [windowWidth] = useWindowSize();
  const toggleMenu = () => {
    if (windowWidth !== 0 && windowWidth <= 768) {
      if (menu) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    }
  };
  return (
    <>
      <div className={styles.circleMenu} role="button" tabIndex="0" onKeyDown={toggleMenu} onClick={toggleMenu}>
        <div className={`${styles.hamburger} ${menu ? styles.menuIcon : null}`}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.hamburgerText}>MENU</div>
        </div>
      </div>
      <Layout className={`${styles.navWrap} ${menu ? null : styles.hidden} ${menu ? styles.openMenu : null}`}>
        <div className={styles.backgroundDiv}>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <Link to="/" onClick={toggleMenu} activeClassName={styles.anchorActive}>
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contact" onClick={toggleMenu} activeClassName={styles.anchorActive}>
                Contact
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/blog" onClick={toggleMenu} activeClassName={styles.anchorActive}>
                Blog
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/tags" onClick={toggleMenu} activeClassName={styles.anchorActive}>
                Tags
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Header;
