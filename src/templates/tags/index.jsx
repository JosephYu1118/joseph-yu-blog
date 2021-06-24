import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import PageLayout from '@/components/PageLayout';
import PostCard from '@/components/PostCard';
import * as styles from './tags.module.scss';

const { capitalize, resolvePageUrl } = pageUtils;

const TagPage = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const tagName = gatsbyConfig.tags[tag].name || capitalize(tag);
  const tagPagePath = gatsbyConfig.pages.tag;
  const posts = data.allMarkdownRemark.edges;

  const seoConfig = {
    path: resolvePageUrl(tagPagePath, tag),
    title: tagName,
    description: `All post about ${tagName}. ${gatsbyConfig.tags[tag].description} `,
    keywords: [tagName],
  };

  return (
    <PageLayout seoConfig={seoConfig}>
      <div className={`marginTopTitle ${styles.tagsList}`}>
        <h1>
          #
          {tagName}
        </h1>
        <div className={styles.bannerImgContainer} />
        <h4 className="textCenter">
          {gatsbyConfig.tags[tag].description}
        </h4>
      </div>
      <Row gutter={[20, 20]}>
        {posts.map((post) => (
          <Col key={post.node.id} xs={24} sm={24} md={12} lg={8}>
            <PostCard data={post} />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    allFile(
      filter: {
        name: { eq: $tag }
        dir: { regex: "/tags$/" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default TagPage;
