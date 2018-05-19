import React from 'react'
import Link from 'gatsby-link'
import LessonListing from "../components/course/lesson-listing";

const LessonsByCoursePage = ({data}) => (
  <div>
    <h2>Courses</h2>
    {data.allMarkdownRemark.edges.filter(({ node })=>node.frontmatter.type === "lesson").map(({ node }) => (
      <LessonListing key={node.id} course={node} />
    ))}
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