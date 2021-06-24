import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';

import pageUtils from '@/utils/pageUtils';
import * as styles from './postCard.module.scss';

const { resolvePageUrl } = pageUtils;

const PostCard = ({
  data: {
    node: { frontmatter },
  },
}) => (
  <div className={styles.postCard}>
    <Link to={resolvePageUrl(frontmatter.path)}>
      <div
        className={styles.postCardImg}
        style={{
          backgroundImage: `url(${frontmatter ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
        }}
      />
      <div className={styles.mrTp20}>
        <p>
          <span className={styles.dateHolder}>
            {frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}
          </span>
        </p>
        <h3>{frontmatter ? frontmatter.title : ''}</h3>
        <p>{frontmatter ? frontmatter.excerpt : ''}</p>
        <p style={{ color: '#ce6d96', wordSpacing: '10px' }}>
          {`#${frontmatter.tags.join(' #')}`}
        </p>
      </div>
    </Link>
  </div>
);

export default PostCard;
