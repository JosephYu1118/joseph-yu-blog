import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

const Comment = ({ pageId, title }) => (
  <Disqus
    config={{
      url: `http://localhost:8000/${pageId}`,
      identifier: pageId,
      title,
    }}
  />
);
export default Comment;
