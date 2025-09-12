const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Răzvan Bibarț',
    description: 'Răzvan Bibarț is a security engineer',
    siteUrl: 'https://razvanbibart.com', 
    image: '/og.png', 
    twitterUsername: '@bibartr',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`, 
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolvePages: ({ allSitePage: { nodes } }) => {
          return nodes.map(node => {
            const path = node.path;
            let priority = 0.5; // default priority
            let changefreq = 'monthly';

            // Homepage - highest priority
            if (path === '/') {
              priority = 1.0;
              changefreq = 'weekly';
            }
            // Important pages
            else if (path.match(/^\/(about|projects|archive)\/$/)) {
              priority = 0.9;
              changefreq = 'weekly';
            }
            // Blog posts and individual projects
            else if (path.match(/^\/(projects)\/[^/]+\/$/)) {
              priority = 0.8;
              changefreq = 'monthly';
            }
            // Job pages
            else if (path.match(/^\/jobs\/[^/]+\/$/)) {
              priority = 0.6;
              changefreq = 'monthly';
            }
            // Other pages
            else {
              priority = 0.5;
              changefreq = 'yearly';
            }

            return {
              path,
              priority,
              changefreq,
            };
          });
        },
        serialize: ({ path, priority, changefreq }) => ({
          url: `https://razvanbibart.com${path}`,
          changefreq,
          priority,
        }),
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ 
          userAgent: '*', 
          allow: '/',
          disallow: ['/__gatsby/', '/page-data/', '/static/']
        }],
        sitemap: 'https://razvanbibart.com/sitemap/sitemap-0.xml',
      
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'RazvanBibart',
        short_name: 'RazvanBibart',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `content`, path: `${__dirname}/content/` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `projects`, path: `${__dirname}/content/projects` },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: { target: '_blank', rel: 'nofollow noopener noreferrer' },
          },
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 700, linkImagesToOriginal: true, quality: 90, tracedSVG: { color: config.colors.green } },
          },
          { resolve: 'gatsby-remark-code-titles' },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              showLineNumbers: false,
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: 'G-BDHHGZC264', head: true, anonymize: true },
    },
  ],
};
