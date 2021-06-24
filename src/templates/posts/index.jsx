/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import 'prismjs/themes/prism-solarizedlight.css';

import PageLayout from '@/components/PageLayout';
import Comment from '@/components/Comment';
import './highlight-syntax.scss';
import * as styles from './posts.module.scss';

const Post = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, excerpt, path } = frontmatter;
  const seoConfig = {
    path,
    title,
    description: excerpt,
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

  return (
    <PageLayout seoConfig={seoConfig}>
      <div className="marginTopTitle">
        <h1>{title}</h1>
        <div className={styles.bannerImgContainer} />
        <article className={styles.blogArticle} dangerouslySetInnerHTML={{ __html: html }} />
        <Comment pageId={path} title={title} />
      </div>
    </PageLayout>
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
