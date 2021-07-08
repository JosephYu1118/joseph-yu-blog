require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const Sass = require('sass');

const gatsbyConfig = require('./src/config/gatsbyConfig');

module.exports = {
  pathPrefix: gatsbyConfig.pathPrefix,
  siteMetadata: {
    siteUrl: gatsbyConfig.siteUrl,
    title: gatsbyConfig.siteTitle,
    author: gatsbyConfig.author,
    description: gatsbyConfig.siteDescription,
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
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Noto Sans TC',
              variants: ['100', '300', '400', '500', '700', '900'],
              // fontDisplay: 'swap',
              // strategy: 'selfHosted' // 'base64' || 'cdn'
            },
            {
              family: 'Titillium Web',
              variants: ['200', '300', '400', '600', '700', '900'],
              // fontDisplay: 'swap',
              // strategy: 'selfHosted' // 'base64' || 'cdn'
            },
          ],
        },
        formatAgents: {
          eot: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)',
          ttf: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8',
          woff: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko',
          woff2: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
        },
        formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
        // usePreconnect: false,
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
        icon: `${__dirname}/src/assets/images/favicon.png`,
        // This will add apple-touch-icon links to <head>. Required for versions prior to iOS 11.3.
        legacy: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: true,
        color: '#41BBD',
      },
    },
  ],
};
