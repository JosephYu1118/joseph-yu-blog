import React from 'react';
import { Link } from 'gatsby';

import Utils from '@/utils/pageUtils';
import gatsbyConfig from '@/config/gatsbyConfig';
import * as styles from './tags.module.scss';

const TagCard = (props) => {
  const {
    img, name, description, color,
  } = props;
  const tagPage = gatsbyConfig.pages.tag;
  return (
    <Link className={styles.tagCard} to={Utils.resolvePageUrl(tagPage, name)}>
      <div className={styles.tagCard}>
        <div
          className={styles.tagImg}
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
        <div className={styles.pd20px}>
          <div className="textCenter">
            <h4 style={{ color: `${color}` }}>
              #
              {name}
            </h4>
          </div>
          <p>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
