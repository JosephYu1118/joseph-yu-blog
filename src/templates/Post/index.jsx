/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import PageLayout from '@/components/PageLayout';
import Comment from '@/components/Comment';
import '@/assets/styles/highlight.scss';
import * as styles from './Post.module.scss';

const { resolvePageUrl } = pageUtils;

const PostTemplate = ({ data }) => {
  const [postData, setPostData] = useState(null);
  const [seoConfig, setSeoConfig] = useState({});

  const handleNavigate = (tag) => {
    navigate(resolvePageUrl(gatsbyConfig.pages.tags, tag));
  };

  useEffect(() => {
    if (!data) return;
    const { html, frontmatter } = data.markdownRemark;
    const {
      path,
      title,
      tags,
      cover: { childImageSharp: { gatsbyImageData } },
      date,
      excerpt,
    } = frontmatter;
    setPostData({
      path,
      title,
      html,
      tagList: tags,
      image: gatsbyImageData,
      date: date.split('T')[0].replaceAll('-', ' / '),
      excerpt,
    });
  }, [data]);

  useEffect(() => {
    if (!postData) return;
    const {
      path, title, tagList, excerpt,
    } = postData;
    setSeoConfig({
      path,
      title,
      description: excerpt,
      keywords: tagList,
    });
  }, [postData]);

  return (
    <PageLayout seoConfig={seoConfig}>
      {postData && (
        <div className={styles.container}>
          <div className="tagsBlock">
            {postData.tagList.map((tag) => (
              <button
                key={tag}
                className="tagBadge"
                type="button"
                onClick={() => handleNavigate(tag)}
              >
                #
                {' '}
                {tag}
              </button>
            ))}
          </div>
          <h1 className={styles.title}>{postData.title}</h1>
          <p className={styles.date}>{postData.date}</p>
          <GatsbyImage className={styles.image} image={postData.image} alt="" />
          <article dangerouslySetInnerHTML={{ __html: postData.html }} />
          <Comment pageId={postData.path} title={postData.title} />
        </div>
      )}
    </PageLayout>
  );
};

export const pageQuery = graphql`
  query($postPath: String!) {
    markdownRemark(
      frontmatter: { path: { eq: $postPath } }
      fileAbsolutePath: { regex: "/index.md$/" }
    ) {
      html
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
`;

export default PostTemplate;
