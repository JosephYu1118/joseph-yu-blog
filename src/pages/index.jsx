import React from 'react';
import { Layout } from 'antd';

import Header from '@/components/PageLayout/Header';
import SidebarWrapper from '@/components/PageLayout/Sidebar';
import AboutMe from '@/components/PageFragments/HomePage/AboutMe';
import Skills from '@/components/PageFragments/HomePage/SkillProgress';
import '@/assets/styles/global.scss';

const App = () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <>
          <AboutMe />
          <Skills />
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

export default App;
