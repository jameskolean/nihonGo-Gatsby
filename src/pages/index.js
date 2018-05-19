import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({data}) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to Nihon Go you site for learding. </p>
    <p>Courses</p>
    <ul>
      <li>course 1</li>
      <li>course 2</li>
    </ul>

  </div>
)

export default IndexPage

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
  }
`;