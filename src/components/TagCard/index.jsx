import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import * as styles from './TagCard.module.scss';

const { resolvePageUrl } = pageUtils;

const { tags } = gatsbyConfig.pages;

const TagCard = ({ title, image }) => (
  <Link className={styles.tagCard} to={resolvePageUrl(tags, title)}>
    <div className={styles.container}>
      <GatsbyImage className={styles.image} image={image} alt="" />
      <div className={styles.tagInfo}>
        <h4 className={styles.title}>
          #
          {title}
        </h4>
      </div>
    </div>
  </Link>
);

export default TagCard;
