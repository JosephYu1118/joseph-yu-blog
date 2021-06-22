import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, Row, Col } from 'antd';

import SEO from '@/components/Seo';
import Header from '@/components/PageLayout/Header';
import PostCard from '@/components/PostCard';
import SidebarWrapper from '@/components/PageLayout/Sidebar';
import Utils from '@/utils/pageUtils';
import gatsbyConfig from '@/config/gatsbyConfig';
import * as styles from './tags.module.less';

const TagPage = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const tagName = gatsbyConfig.tags[tag].name || Utils.capitalize(tag);
  const tagPagePath = gatsbyConfig.pages.tag;
  // const tagImage = data.allFile.edges.find((edge) => edge.node.name === tag).node
  //   .childImageSharp.fluid;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title={tagName}
          description={`All post about ${tagName}. ${gatsbyConfig.tags[tag].description} `}
          path={Utils.resolvePageUrl(tagPagePath, tag)}
          keywords={[tagName]}
        />
        <SidebarWrapper>
          <div className={`marginTopTitle ${styles.tagsList}`}>
            <h1>
              #
              {tagName}
            </h1>
            <div className={styles.bannerImgContainer}>
              {/* <StaticImage className={styles.bannerImg} src={tagImage} alt={tagName} /> */}
            </div>
            <h4 className="textCenter">
              {gatsbyConfig.tags[tag].description}
            </h4>
          </div>
          <Row gutter={[20, 20]}>
            {posts.map((post, key) => (
            // eslint-disable-next-line react/no-array-index-key
              <Col key={key} xs={24} sm={24} md={12} lg={8}>
                <PostCard data={post} />
              </Col>
            ))}
          </Row>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

TagPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              // fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
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
    allFile(filter: { name: { eq: $tag }, dir: { regex: "/tags$/" } }) {
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
