import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import pageUtils from '@/utils/pageUtils';
import * as styles from './ArticleCard.module.scss';

const { resolvePageUrl } = pageUtils;

const ArticleCard = ({
  path,
  title,
  tagList,
  image,
  date,
  excerpt,
}) => (
  <Link className={styles.articleCard} to={resolvePageUrl(path)}>
    <div className={styles.container}>
      <GatsbyImage className={styles.image} image={image} alt="" />
      <div className={styles.articleInfo}>
        <p className={styles.date}>{date}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={`paragraph ${styles.excerpt}`}>{excerpt}</p>
        <div className={styles.tagsBlock}>
          {tagList.map((tag) => (
            <div key={tag} className={styles.tag}>
              #
              {' '}
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
