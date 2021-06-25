import React, { useRef, useEffect } from 'react';

import getRandomNumber from '@/utils/getRandomNumber';
import * as styles from './ProgressBar.module.scss';

const ProgressBar = ({ title, value }) => {
  const timerRefs = useRef();

  const time = getRandomNumber(1, 10);

  const handleAnimationEnd = (event) => {
    event.target.classList.remove(styles.animation);
    timerRefs.current = setTimeout(() => {
      event.target.classList.add(styles.animation);
    }, time * 1000);
  };

  useEffect(() => () => {
    clearTimeout(timerRefs);
  }, []);

  return (
    <div className={styles.progressBar}>
      <div className={styles.container}>
        <div
          className={`${styles.progress} ${styles[`value${value}`]} ${styles.animation}`}
          onAnimationEnd={handleAnimationEnd}
        />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.value}>
        {value}
        %
      </div>
    </div>
  );
};

export default ProgressBar;
