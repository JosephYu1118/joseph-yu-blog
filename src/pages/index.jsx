/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import PageLayout from '@/components/PageLayout';
import Skills from '@/components/Skills';
import Gallery from '@/components/Gallery';

const paragraphList = [
  `
    我是俞敬聲，是個前端工程師，三年前自學程式語言，從數位行銷領域工作轉職軟體開發，至今已使用 JavaScript 開發超過兩年。
    工作期間主要使用 Vue 與 React 兩大主流框架，從初期的維護工作到完整開發一項專案，更參與了專案重構項目，將 Vue 的專案轉換成 React，對於兩框架的 API、元件生命週期、數據流有一定的概念。
    熟悉 JavaScript ES12、RESTful API 串接、Git 版本控管、Webpack 的從頭建置等相關技術，並且持續學習與探索各種有趣的新技術、提升開發效率或精進程式品質的方式。
    <br />
    <br />
  `,
  `
    平時的我雖然有點宅，喜歡在家打電動、看電影，但我也是常跑戶外演唱會或音樂節，同時也是個熱愛旅遊，喜歡探索不同世界的人，透過攝影紀錄當下的景象或觀察人與人之間互動的美，使我感覺生命的每一刻都更具有獨特的故事與存在。
  `,
];

const seoConfig = {
  title: 'About',
};

const About = ({ location, data }) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (!data) return;
    const formattedList = data.allFile.nodes.map(({ childImageSharp }) => {
      const { id, gatsbyImageData } = childImageSharp;
      return { id, gatsbyImageData };
    });
    setImageList(formattedList);
  }, [data]);

  return (
    <PageLayout seoConfig={seoConfig} location={location}>
      <h1 className="mainTitle">About Me</h1>
      {paragraphList.map((paragraph) => (
        <p
          key={paragraph}
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
      <Skills />
      <Gallery imageList={imageList} />
    </PageLayout>
  );
};

export const query = graphql`
  {
    allFile(
      filter: { relativeDirectory: { regex: "/gallery/" } }
      sort: {
        fields: name
        order: ASC
      }
    ) {
      nodes {
        childImageSharp {
          id
          gatsbyImageData
        }
      }
    }
  }
`;

export default About;
