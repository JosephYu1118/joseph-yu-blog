import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import PageLayout from '@/components/PageLayout';
import ArticleCard from '@/components/ArticleCard';

const seoConfig = {
  path: 'blog',
  title: 'Blog',
  description: `
    I like blogging about various web technologies and other stuff related to
    javascript and other trends like graphql, prisma etc. 
    his blog expresses my views of various technologies and scenarios I have come across in realtime.
  `,
};

const Blog = ({ data }) => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    if (!data) return;
    const formattedList = [];
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const {
        id,
        frontmatter: {
          path,
          title,
          tags,
          cover: {
            childImageSharp: { gatsbyImageData },
          },
          date,
          excerpt,
        },
      } = node;
      formattedList.push({
        id,
        path,
        title,
        tagList: tags,
        image: gatsbyImageData,
        date: date.split('T')[0].replaceAll('-', ' / '),
        excerpt,
      });
    });
    setArticleList(formattedList);
  }, [data]);

  return (
    <PageLayout seoConfig={seoConfig}>
      <h1 className="mainTitle">Blog</h1>
      <Row gutter={[20, 20]}>
        {articleList.length && articleList.map(({
          id,
          path,
          title,
          tagList,
          image,
          date,
          excerpt,
        }) => (
          <Col key={id} xs={24} sm={24} md={12} lg={8}>
            <ArticleCard
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;

export default Blog;
