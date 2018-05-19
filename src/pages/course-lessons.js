import React from 'react'
import Link from 'gatsby-link'

const LessonsByCoursePage = ({data}) => (
  <div>
    <h2>Courses</h2>
  </div>)

export default LessonsByCoursePage

export const query = graphql`
  query LessonsByCourse {
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