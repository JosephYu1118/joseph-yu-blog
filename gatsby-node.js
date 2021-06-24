const path = require('path');

const config = require('./src/config/gatsbyConfig');
const utils = require('./src/utils/pageUtils');

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
      allMarkdownRemark(sort: {
        order: DESC,
        fields: [frontmatter___date]}
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
            fileAbsolutePath
          }
        }
      }
    }    
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { allMarkdownRemark } = result.data;

    /* Post pages */
    allMarkdownRemark.edges.forEach(({ node }) => {
      // Check path prefix of post
      if (node.frontmatter.path.indexOf(config.pages.blog) !== 0) {
        const errorMessage = `Invalid path prefix: ${node.frontmatter.path}`;

        throw errorMessage;
      }

      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/posts/index.jsx'),
        context: {
          postPath: node.frontmatter.path,
          translations: utils.getRelatedTranslations(node, allMarkdownRemark.edges),
        },
      });
    });

    const regexForIndex = /index\.md$/;
    // Posts in default language, excluded the translated versions
    const defaultPosts = allMarkdownRemark.edges
      .filter(({ node: { fileAbsolutePath } }) => fileAbsolutePath.match(regexForIndex));

    /* Tag pages */
    const allTags = [];

    defaultPosts.forEach(({ node }) => {
      node.frontmatter.tags.forEach((tag) => {
        if (allTags.indexOf(tag) === -1) {
          allTags.push(tag);
        }
      });
    });

    allTags.forEach((tag) => {
      createPage({
        path: utils.resolvePageUrl(config.pages.tag, tag),
        component: path.resolve('src/templates/tags/index.jsx'),
        context: { tag },
      });
    });

    return 1;
  });
};
