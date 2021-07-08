import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

const Comment = ({ pageId, title }) => (
  <Disqus
    config={{
      url: `https://joseph-yu-blog.netlify.app/${pageId}`,
      identifier: pageId,
      title,
    }}
  />
);

export default Comment;
