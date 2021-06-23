/* eslint-disable react/no-danger */
import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import 'prismjs/themes/prism-solarizedlight.css';

import Header from '@/components/PageLayout/Header';
import SidebarWrapper from '@/components/PageLayout/Sidebar';
import SEO from '@/components/Seo';
import Comment from '@/components/Comment';
import Utils from '@/utils/pageUtils';
import gatsbyConfig from '@/config/gatsbyConfig';
import './highlight-syntax.scss';
import * as styles from './post.module.scss';

const Post = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const {
    title, excerpt, path,
  } = frontmatter;

  const canonicalUrl = Utils.resolvePageUrl(
    gatsbyConfig.siteUrl,
    gatsbyConfig.pathPrefix,
    path,
  );
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          title={title}
          description={excerpt}
          path={path}
          keywords={['Rolwin', 'Reevan', 'Monteiro', 'FullStack developer', 'Javascript', 'ReactJS', 'NodeJS', 'Gatsby', 'technology']}
        />
        <Header />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1>{title}</h1>
            <div className={styles.bannerImgContainer}>
              {/* <StaticImage className={styles.bannerImg}
              src={fluid} title={excerpt} alt={title} /> */}
            </div>
            <article className={styles.blogArticle} dangerouslySetInnerHTML={{ __html: html }} />
            <Comment pageCanonicalUrl={canonicalUrl} pageId={title} />
          </div>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($postPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $postPath } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        tags
        path
        excerpt
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { path: { ne: $postPath } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
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
  }
`;

export default Post;
