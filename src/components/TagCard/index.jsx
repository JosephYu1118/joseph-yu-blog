import React from 'react';
import { Link } from 'gatsby';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import * as styles from './tags.module.scss';

const { resolvePageUrl } = pageUtils;

const TagCard = ({
  img,
  name,
  description,
  color,
}) => {
  const tagPage = gatsbyConfig.pages.tag;

  return (
    <Link className={styles.tagCard} to={resolvePageUrl(tagPage, name)}>
      <div className={styles.tagCard}>
        <div
          className={styles.tagImg}
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className={styles.pd20px}>
          <div className={styles.text}>
            <h4 style={{ color }}>
              #
              {name}
            </h4>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
