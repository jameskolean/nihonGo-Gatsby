import React, { Component } from "react";
import LessonListing from "../components/course/lesson-listing";

export default class CoursePageTmpl extends Component {
  render() {
    const { data } = this.props;
//    data.markdownRemark.fields.lessons.map(node => console.log(node));
//    console.log(data.markdownRemark.fields.lessons);
    return (
      <div>
        <span>{data.markdownRemark.frontmatter.date}</span>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <h4>{data.markdownRemark.frontmatter.subtitle}</h4>
        <h4>Lessons</h4>
        {data.markdownRemark.fields.lessons.map( node  => (
          <LessonListing key={node.id} lesson={node} />
          // <LessonListing lesson={node} />
        ))}

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
      }
      fields {
        slug
        lessons {
          id
          frontmatter{
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
#  fragment lessonDetails on course {
#    title
#  }
`;
