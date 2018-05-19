import React from "react";
import Link from "gatsby-link";

const CourseListing = ({ course }) => (
  <article>
    <h3><Link to={course.fields.slug}>{course.frontmatter.title}</Link></h3>
    <div>{course.frontmatter.date}</div>
    <p>{course.excerpt}</p>
    {/* <div
      dangerouslySetInnerHTML={{
        __html: course.html
      }}/>   */}
  </article>
);

export default CourseListing;
