require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const Sass = require('sass');

const config = require('./src/config/gatsbyConfig');

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-antd',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: Sass,
        additionalData: `@import '${__dirname}/src/assets/styles/variables.scss';`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans Tc', 'Titillium Web'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              quality: 80,
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx'],
        exclude: ['node_modules', '.cache', 'public'],
      },
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'joseph-yu-blog',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Joseph Yu',
        short_name: 'Joseph Yu',
        start_url: '/',
        background_color: '#F4D35E',
        theme_color: '#F4D35E',
        display: 'standalone',
        // This path is relative to the root of the site.
        icon: 'src/assets/images/favicon.png',
        // This will add apple-touch-icon links to <head>. Required for versions prior to iOS 11.3.
        legacy: true,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: config.defaultLanguage,
        useLangKeyLayout: false,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'black',
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
  ],
};
