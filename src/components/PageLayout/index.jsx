import React from 'react';
import { Layout, Row, Col } from 'antd';

import useWindowSize from '@/hooks/useWindowSize';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import '@/assets/styles/base.scss';
import * as styles from './PageLayout.module.scss';

const { Content } = Layout;

const PageLayout = ({ location, children, seoConfig }) => {
  const [windowWidth] = useWindowSize();

  const isProfileVisible = location.pathname === '/' || windowWidth > 768;

  return (
    <Layout className={styles.pageLayout}>
      <Layout className={styles.container}>
        <SEO
          path={seoConfig.path}
          title={seoConfig.title}
          description={seoConfig.description}
          keywords={seoConfig.keywords}
        />
        <Header />
        <Content className={styles.content}>
          <Row>
            <Col xs={24} sm={24} md={9} lg={6}>
              {isProfileVisible && <Profile />}
            </Col>
            <Col xs={24} sm={24} md={15} lg={18} className={styles.childrenLayout}>
              {children}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
