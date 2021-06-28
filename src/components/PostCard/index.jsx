import React from 'react';
import { navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import * as styles from './PostCard.module.scss';

const { resolvePageUrl } = pageUtils;

const PostCard = ({
  path,
  title,
  tagList,
  image,
  date,
  excerpt,
}) => {
  const handleNavigate = (event, routePath) => {
    event.stopPropagation();
    navigate(routePath);
  };

  return (
    <div
      className={styles.postCard}
      role="presentation"
      onClick={(event) => handleNavigate(event, resolvePageUrl(path))}
    >
      <div className={styles.postInfo}>
        <GatsbyImage className={styles.image} image={image} alt="" />
        <p className={styles.date}>{date}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={`paragraph ${styles.excerpt}`}>{excerpt}</p>
      </div>
      <div className="tagsBlock">
        {tagList.map((tag) => (
          <button
            key={tag}
            className="tagBadge"
            type="button"
            onClick={(event) => handleNavigate(event, resolvePageUrl(gatsbyConfig.pages.tags, tag))}
          >
            #
            {' '}
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
