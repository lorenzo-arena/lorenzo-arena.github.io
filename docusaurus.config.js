// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Closing The Loop',
  tagline: '',
  favicon: 'img/favicon.ico',

  url: 'https://lorenzo-arena.github.io',

  organizationName: 'lorenzo-arena',
  projectName: 'lorenzo-arena.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          routeBasePath: '/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Closing The Loop',
        logo: {
          alt: 'Closing The Loop Logo',
          src: 'img/closing-the-loop.png',
        },
        items: [
            {to: 'blog', label: 'Blog', position: 'left'},
            {to: 'about', label: 'About', position: 'left'},
        ],
      },
      footer: {
        links: [
        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
