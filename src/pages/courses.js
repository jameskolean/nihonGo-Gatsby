import React from 'react'
import Link from 'gatsby-link'
import CourseListing from "../components/course/course-listing";

const IndexPage = ({data}) => (
  <div>
    <h2>Courses</h2>
    {data.allMarkdownRemark.edges.filter(({ node })=>node.frontmatter.type === "course").map(({ node }) => (
      <CourseListing key={node.id} course={node} />
    ))}
  </div>)

export default IndexPage

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            type
            title
            date(formatString: "MMMM DD YYYY")
          }
          html
          excerpt
        }
      }
    }
  }
`;