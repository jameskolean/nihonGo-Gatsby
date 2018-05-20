import React, { Component } from "react";

export default class CoursePageTmpl extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <span>{data.markdownRemark.frontmatter.date}</span>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <h4>{data.markdownRemark.frontmatter.subtitle}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html
          }}
        />
      </div>
    );
  }
}

export const query = graphql`
  query CourseQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD YYYY")
#        lessons {
#          lesson {
#            ...lessonDetails
#          }
#        }
      }
    }
  }
#  fragment lessonDetails on course {
#    title
#  }
`;
