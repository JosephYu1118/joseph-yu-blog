import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout, Row, Col } from 'antd';

import PageLayout from '@/components/PageLayout';
import * as styles from './404.module.scss';

const { Content } = Layout;

const Error = ({ data }) => {
  console.log('404 data', data);
  return (
    <PageLayout>
      <Content className={`${styles.content} ${styles.background} `}>
        <Row>
          <Col sm={24} md={24} lg={24}>
            <Layout className={`${styles.background} ${styles.boxContent} ${styles.sideBar404Radius}`}>
              <div className={`${styles.sidebar404Img} ${styles.boxContent}`}>
                {/* <img
                src={data.file.childImageSharp.fluid.src}
                width="100%"
                alt="404"
              /> */}
              </div>
              <div className={styles.boxContent}>
                <h1>This page was lost</h1>
                <p>
                  The Page You are looking for isn’t available. Try to search again or use
                  the Go Back button below.
                </p>
                <Link to="/">
                  <div className={styles.textHover}>
                    <div className={styles.goBackBtn}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                      >
                        <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z" />
                      </svg>
                    </div>
                    <span>Go Back</span>
                  </div>
                </Link>
              </div>
            </Layout>
          </Col>
        </Row>
      </Content>
    </PageLayout>
  );
};

export const query = graphql`
  {
    file(base: { eq: "404.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

export default Error;
