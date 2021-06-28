const path = require('path');

const config = require('./src/config/gatsbyConfig');
const pageUtils = require('./src/utils/pageUtils');

const { resolvePageUrl } = pageUtils;

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___date]
          order: DESC
        }
      ) {
        nodes {
          frontmatter {
            path
            tags
          }
        }
      }
    }    
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const postList = result.data.allMarkdownRemark.nodes;
    const tagList = [];

    postList.forEach(({ frontmatter }) => {
      frontmatter.tags.forEach((tag) => {
        if (tagList.indexOf(tag) === -1) {
          tagList.push(tag);
        }
      });
    });

    /* Post pages */
    postList.forEach(({ frontmatter }) => {
      // Check path prefix of post
      if (frontmatter.path.indexOf(config.pages.blog) !== 0) {
        const errorMessage = `Invalid path prefix: ${frontmatter.path}`;
        throw errorMessage;
      }
      createPage({
        path: frontmatter.path,
        component: path.resolve('src/templates/Post/index.jsx'),
        context: { postPath: frontmatter.path },
      });
    });

    /* Tag pages */
    tagList.forEach((tag) => {
      createPage({
        path: resolvePageUrl(config.pages.tags, tag),
        component: path.resolve('src/templates/Tag/index.jsx'),
        context: { tag },
      });
    });

    return Promise.resolve();
  });
};
