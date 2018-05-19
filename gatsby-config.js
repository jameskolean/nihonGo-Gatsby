module.exports = {
  siteMetadata: {
    title: 'Nihon Go',
    desc: 'Your learning resource center',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/assets/images`,
      }

    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
