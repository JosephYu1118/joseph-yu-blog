import React from 'react';
import { navigate } from 'gatsby';

import gatsbyConfig from '@/config/gatsbyConfig';
import tagsMap from '@/lib/tagsMap';
import pageUtils from '@/utils/pageUtils';
import * as styles from './PostCard.module.scss';

const { resolvePageUrl } = pageUtils;

const PostCard = ({
  path,
  title,
  tagList,
  date,
  excerpt,
}) => {
  const handleNavigate = (event, routePath) => {
    event.stopPropagation();
    navigate(routePath);
  };

  const getImageStyle = () => {
    const { backgroundColor, color } = tagsMap[tagList[0]];
    return { backgroundColor, color };
  };

  return (
    <div
      className={styles.postCard}
      role="presentation"
      onClick={(event) => handleNavigate(event, resolvePageUrl(path))}
    >
      <div className={styles.image} style={getImageStyle()}>{title}</div>
      <p className={styles.date}>{date}</p>
      <p className={`paragraph ${styles.excerpt}`}>{excerpt}</p>
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
