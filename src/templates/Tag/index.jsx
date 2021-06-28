import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';
import tagsMap from '@/lib/tagsMap';
import PageLayout from '@/components/PageLayout';
import PostCard from '@/components/PostCard';
import * as styles from './Tag.module.scss';

const { resolvePageUrl } = pageUtils;

const TagTemplate = ({ data, pageContext }) => {
  const [postList, setPostList] = useState([]);

  const tagName = tagsMap[pageContext.tag].name;
  const seoConfig = {
    path: resolvePageUrl(gatsbyConfig.pages.tags, pageContext.tag),
    title: tagName,
    description: `All posts about ${tagName}.`,
    keywords: [tagName],
  };

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
    <PageLayout seoConfig={seoConfig}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          #
          {' '}
          {pageContext.tag}
        </h2>
        <div className={styles.demarcation} />
      </div>
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

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/index.md$/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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

export default TagTemplate;
