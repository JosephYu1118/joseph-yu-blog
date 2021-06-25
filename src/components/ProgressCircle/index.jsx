import React, { useRef, useEffect } from 'react';

import getRandomNumber from '@/utils/getRandomNumber';
import * as styles from './ProgressCircle.module.scss';

const getStrokeDashoffset = (value) => {
  const r = 100;
  const c = Math.PI * (r * 2);

  return ((r - value) / r) * c;
};

const ProgressCircle = ({ title, value }) => {
  const timerRefs = useRef();
  const progressRef = useRef();

  const time = getRandomNumber(-1, 3);

  useEffect(() => {
    timerRefs.current = setTimeout(() => {
      progressRef.current?.classList.add(styles.animation);
    }, time * 1000);

    return () => clearTimeout(timerRefs);
  }, [time]);

  return (
    <div className={styles.progressCircle}>
      <div className={styles.container}>
        <svg viewBox="-10 -10 220 220">
          <circle className={styles.base} cx="100" cy="100" r="100" />
          <circle
            ref={progressRef}
            className={styles.progress}
            cx="100"
            cy="100"
            r="100"
            style={{ strokeDashoffset: getStrokeDashoffset(value) }}
          />
        </svg>
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>
          {value}
          %
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
