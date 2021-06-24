import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import PageLayout from '@/components/PageLayout';
import PostCard from '@/components/PostCard';

const seoConfig = {
  path: 'blog',
  title: 'Blog',
  description: `
    I like blogging about various web technologies and other stuff related to
    javascript and other trends like graphql, prisma etc. 
    his blog expresses my views of various technologies and scenarios I have come across in realtime.
  `,
};

const Blog = ({ data }) => (
  <PageLayout seoConfig={seoConfig}>
    <div className="marginTopTitle">
      <h1 className="titleSeparate">Blog</h1>
    </div>
    <Row gutter={[20, 20]}>
      {data.allMarkdownRemark && data.allMarkdownRemark.edges.map((val) => (
        <Col key={val.node.id} xs={24} sm={24} md={12} lg={8}>
          <PostCard data={val} />
        </Col>
      ))}
    </Row>
  </PageLayout>
);

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
                fluid(maxWidth: 288) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Blog;
