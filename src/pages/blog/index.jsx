import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import PageLayout from '@/components/PageLayout';
import PostCard from '@/components/PostCard';

const seoConfig = {
  path: 'blog',
  title: 'Blog',
  description: '記錄自己學習的歷程、演算法還有一些在寫 code 時遇過的坑。',
};

const Blog = ({ location, data }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (!data) return;
    const formattedList = data.allMarkdownRemark.nodes.map(({ id, frontmatter }) => {
      const {
        path,
        title,
        tags,
        cover: { childImageSharp: { gatsbyImageData } },
        date,
        excerpt,
      } = frontmatter;
      return {
        id,
        path,
        title,
        tagList: tags,
        image: gatsbyImageData,
        date: date.split('T')[0].replaceAll('-', ' / '),
        excerpt,
      };
    });
    setPostList(formattedList);
  }, [data]);

  return (
    <PageLayout seoConfig={seoConfig} location={location}>
      <h1 className="mainTitle">Blog</h1>
      <Row gutter={[20, 40]}>
        {postList.length && postList.map(({
          id,
          path,
          title,
          tagList,
          image,
          date,
          excerpt,
        }) => (
          <Col key={id} xs={24} sm={24} md={12} lg={8}>
            <PostCard
              path={path}
              title={title}
              tagList={tagList}
              image={image}
              date={date}
              excerpt={excerpt}
            />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      nodes {
        id
        frontmatter {
          path
          title
          tags
          cover {
            childImageSharp {
              gatsbyImageData
            }
          }
          date
          excerpt
        }
      }
    }
  }
`;

export default Blog;
