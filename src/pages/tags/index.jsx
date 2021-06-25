import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import gatsbyConfig from '@/config/gatsbyConfig';
import PageLayout from '@/components/PageLayout';
import TagCard from '@/components/TagCard';

const seoConfig = {
  path: 'tags',
  title: 'Tags',
  description: `
    This page consists of various Tags on various technologies that I'll be using
    to write blogs. You can check the blogs related to the tags by clicking on any of the tags below.
  `,
};

const Tags = ({ data }) => {
  const { allFile: { edges } } = data;
  const rawTags = data.allMarkdownRemark.edges
    .map((edge) => edge.node.frontmatter.tags)
    .reduce((prev, curr) => prev.concat(curr));
  rawTags
    .filter((tag, index) => index === rawTags.indexOf(tag))
    .sort();
  const tagData = gatsbyConfig.tags;

  return (
    <PageLayout seoConfig={seoConfig}>
      <h1 className="mainTitle">#Tags</h1>
      <Row gutter={[30, 20]}>
        {edges.map((val) => (
          <Col key={val.node.id} xs={24} sm={24} md={12} lg={8}>
            <TagCard
              img={val.node.childImageSharp.fluid.src}
              name={val.node.name}
              description={tagData[val.node.name].description}
              color={tagData[val.node.name].color}
            />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/index.md$/" } }) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "tags" } }) {
      edges {
        node {
          id
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default Tags;
