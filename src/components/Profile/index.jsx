import React from 'react';

import * as styles from './Profile.module.scss';

const Profile = () => (
  <aside>
    <div className={styles.profileAvatar} />
    <div className={`${styles.name} centerAlign`}>
      <div className={`${styles.boxName} centerAlign`}>
        <h2>
          Rolwin
          {' '}
          <span>Reevan</span>
        </h2>
      </div>
      <div className={`${styles.badge} ${styles.badgeGray}`}>Software Engineer</div>
      <ul className={`box ${styles.badge} contactBlock`}>
        <li className={`${styles.contactBlockItem}`}>May 9,1995</li>
        <li className={`${styles.contactBlockItem}`}>Bangalore, India</li>
      </ul>
    </div>
  </aside>
);

export default Profile;
