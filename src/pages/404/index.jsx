import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import PageLayout from '@/components/PageLayout';
import * as styles from './404.module.scss';

const seoConfig = {
  path: '404',
  title: '404',
  description: '很抱歉，您尋找的頁面不存在！',
};

const Page404 = ({ location, data }) => (
  <PageLayout location={location} seoConfig={seoConfig}>
    <div className={styles.container}>
      <GatsbyImage
        className={styles.image}
        image={data.file.childImageSharp.gatsbyImageData}
        alt=""
      />
      <h2 className={styles.title}>很抱歉，您尋找的頁面不存在！</h2>
    </div>
  </PageLayout>
);

export const query = graphql`
  {
    file(base: { eq: "404.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default Page404;
