import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import gatsbyConfig from '@/config/gatsbyConfig';
import pageUtils from '@/utils/pageUtils';

const { resolvePageUrl } = pageUtils;
const { siteUrl, siteTitle, pathPrefix } = gatsbyConfig;

const initDescription = '身為前端工程師的學習雜記';

const initKeyWords = [
  '俞敬聲',
  'Joseph',
  'Yu',
  'front-end',
  'developer',
  'JavaScript',
  'React',
  'Vue',
  'Gatsby',
];

const SEO = ({
  path = '',
  title = '',
  description = initDescription,
  keywords = initKeyWords,
  imageUrl = '',
  contentType = 'website',
  lang = 'zh_TW',
}) => {
  const [pageUrl, setPageUrl] = useState('');

  const meta = [
    { property: 'og:url', content: pageUrl },
    { property: 'og:site_name', content: siteTitle },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
    { property: 'og:type', content: contentType },
    { property: 'og:locale', content: lang },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
  ];

  const link = [
    { rel: 'canonical', href: pageUrl },
  ];

  useEffect(() => {
    setPageUrl(resolvePageUrl(siteUrl, pathPrefix, path));
  }, [path]);

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={meta}
      link={link}
    />
  );
};

export default SEO;
