import React from 'react';
import {
  Affix, Layout, Row, Col,
} from 'antd';

import useWindowSize from '@/hooks/useWindowSize';
import * as styles from './sidebar.module.scss';

const { Content } = Layout;
// const {
//   facebook, github, instagram, twitter,
// } = Config.social;

const DomContent = () => (
  <aside>
    <div className={styles.profileAvatar} />
    <div className={`${styles.name} centerAlign`}>
      <div className={`${styles.boxName} centerAlign`}>
        <h2>
          Rolwin
          {' '}
          <span>Reevan</span>
        </h2>
      </div>
      <div className={`${styles.badge} ${styles.badgeGray}`}>Software Engineer</div>
      <div className="centerAlign box">
        {/* <a href={facebook} target="_blank" label="button"
        rel="noopener noreferrer"><FA name="facebook-f" /></a>
        <a href={twitter} target="_blank" label="button"
        rel="noopener noreferrer"><FA name="twitter" /></a>
        <a href={github} target="_blank" label="button"
        rel="noopener noreferrer"><FA name="github" /></a>
        <a href={instagram} target="_blank" label="button"
        rel="noopener noreferrer"><FA name="instagram" /></a> */}
      </div>
      <ul className={`box ${styles.badge} contactBlock`}>
        <li className={`${styles.contactBlockItem}`}>
          <span>
            {/* <FeatherIcon size="19" icon="calendar" /> */}
            {' '}
          </span>
&nbsp; &nbsp; May 9,1995
        </li>
        <li className={`${styles.contactBlockItem}`}>
          {/* <span><FeatherIcon size="19" icon="map-pin" /></span> */}
          {' '}
&nbsp; &nbsp; Bangalore, India
        </li>
        <li className={`${styles.contactBlockItem}`}>
          {/* <span><FeatherIcon size="19" icon="mail" /></span> */}
          {' '}
&nbsp; &nbsp;
          <a
            href="mailto:&#114;&#111;&#108;&#119;&#105;&#110;&#109;&#111;&#110;&#116;&#101;&#105;&#114;&#111;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
            target="_top"
          >
            <span className={styles.emailHider}>@</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
);

const Sidebar = (props) => {
  const [windowWidth] = useWindowSize();
  const { children } = props;
  // const { pathname } = globalHistory.location;
  let domContent = <DomContent />;
  if (windowWidth > 997) {
    domContent = (
      <Affix offsetTop={0}>
        <DomContent />
      </Affix>
    );
  }
  if (windowWidth < 768) {
    domContent = <></>;
    // if (pathname === '/') {
    //   domContent = <DomContent />;
    // }
  }
  return (
    <>
      <Layout>
        <Content className={`${styles.content} ${styles.background}`}>
          <Row>
            <Col sm={24} md={9} lg={6} className={styles.sidebarContent}>
              { domContent }
            </Col>
            <Col sm={24} md={15} lg={18}>
              <Layout className={`${styles.background} ${styles.boxContent} borderRadiusSection`}>
                { children }
              </Layout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export const Sidebar404 = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Content className={`${styles.content} ${styles.background} `}>
        <Row>
          <Col sm={24} md={24} lg={24}>
            <Layout className={`${styles.background} ${styles.boxContent} ${styles.sideBar404Radius}`}>
              {children}
            </Layout>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Sidebar;
