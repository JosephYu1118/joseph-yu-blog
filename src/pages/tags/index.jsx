import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import PageLayout from '@/components/PageLayout';
import TagCard from '@/components/TagCard';

const seoConfig = {
  path: 'tags',
  title: 'Tags',
  description: '可以在此頁面透過有興趣的標籤找到相對應的文章',
};

const Tags = ({ data }) => {
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    if (!data) return;
    const formattedList = data.allFile.nodes.map(({ name, childImageSharp }) => {
      const { id, gatsbyImageData } = childImageSharp;
      return { id, name, gatsbyImageData };
    });
    setTagList(formattedList);
  }, [data]);

  return (
    <PageLayout seoConfig={seoConfig}>
      <h1 className="mainTitle">Tags</h1>
      <Row gutter={[30, 20]}>
        {tagList.map(({ id, name, gatsbyImageData }) => (
          <Col key={id} xs={24} sm={24} md={12} lg={6}>
            <TagCard title={name} image={gatsbyImageData} />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

export const query = graphql`
  {
    allFile(
      filter: { relativeDirectory: { regex: "/tags/" } }
      sort: {
        fields: name
        order: ASC
      }
    ) {
      nodes {
        name
        childImageSharp {
          id
          gatsbyImageData
        }
      }
    }
  }
`;

export default Tags;
