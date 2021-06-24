import React from 'react';
import {
  Affix, Layout, Row, Col,
} from 'antd';

import useWindowSize from '@/hooks/useWindowSize';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import * as styles from './PageLayout.module.scss';

const { Content } = Layout;

const PageLayout = ({ children, seoConfig }) => {
  const [windowWidth] = useWindowSize();

  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          path={seoConfig.path}
          title={seoConfig.title}
          description={seoConfig.description}
          keywords={seoConfig.keywords}
        />
        <Header />
        <Content className={`${styles.content} ${styles.background}`}>
          <Row>
            <Col sm={24} md={9} lg={6} className={styles.sidebarContent}>
              {windowWidth <= 997 ? <Profile /> : (
                <Affix offsetTop={0}>
                  <Profile />
                </Affix>
              )}
            </Col>
            <Col sm={24} md={15} lg={18}>
              <Layout className={`${styles.background} ${styles.boxContent} borderRadiusSection`}>
                {children}
              </Layout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
