/* eslint-disable react/no-danger */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Row, Col } from 'antd';

import stripHtmlTags from '@/utils/stripHtmlTags';
import PageLayout from '@/components/PageLayout';
import Skills from '@/components/Skills';

const paragraphList = [
  `
    我是俞敬聲，是個網頁前端工程師，三年前自學程式語言，從數位行銷領域工作轉職軟體開發，至今已使用 JavaScript 開發達兩年時間。
    工作期間使用 Vue 與 React 兩大主流框架，從初期的維護工作到完整開發一項專案，也參與了專案重構項目，
    將 Vue 的專案轉換成 React，對於兩框架的 API 、元件生命週期、數據流有一定的概念。
    熟悉 JavaScript ES12、RESTful API 串接、Git 工作流程、打包工具 Webpack 的從頭建置等相關技術，
    並且持續學習、探索各種有趣的新技術以及讓自己的開發能更有效率且性能更佳的方式。
    <br />
    <br />
  `,
  `
    平時的我雖然有點宅，喜歡在家打電動、看電影，但我也是常跑戶外演唱會或音樂節，同時也是個熱愛旅遊，喜歡探索不同世界的人，
    透過攝影紀錄當下的景象或觀察人與人之間互動的美，使我感覺生命的每一刻都更具有獨特的故事與存在。
  `,
];

const seoConfig = {
  title: 'About',
  description: stripHtmlTags(paragraphList.join(' ')),
  keywords: [
    '俞敬聲',
    'Joseph',
    'Yu',
    'front-end',
    'developer',
    'JavaScript',
    'React',
    'Vue',
    'Gatsby',
  ],
};

const About = () => {
  const imageData = useStaticQuery(graphql`
    {
      allImageSharp(filter: {
        fluid: {
          src: {
            regex: "/0[1-9].jpg$/"
          }
        }
      }) {
        nodes {
          id
          gatsbyImageData
        }
      }
    }
  `);

  return (
    <PageLayout seoConfig={seoConfig}>
      <h1 className="mainTitle">About Me</h1>
      {paragraphList.map((paragraph) => (
        <p
          key={paragraph}
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
      <Skills />
      <h2 className="subTitle">Photos</h2>
      <Row gutter={[10, 10]}>
        {imageData.allImageSharp.nodes.map(({ id, gatsbyImageData }) => (
          <Col key={id} xs={24} sm={24} md={12} lg={8}>
            <GatsbyImage className="eventDisabled" image={gatsbyImageData} alt="" />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

export default About;
