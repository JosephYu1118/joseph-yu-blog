import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './NoData.module.scss';

const NoData = ({
  message = '痾...目前還沒有文章，會儘快產出的～',
}) => {
  const data = useStaticQuery(graphql`
    {
      imageSharp(original: { src: { regex: "/no-data/" } }) {
        gatsbyImageData
      }
    }
  `);

  return (
    <div className={styles.noData}>
      <GatsbyImage
        className={styles.image}
        image={data.imageSharp.gatsbyImageData}
        alt=""
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default NoData;
