import React from "react";
import Link from "gatsby-link";

const CourseListing = ({ course }) => (
  <article>
    <h2><Link to={course.fields.slug}>{course.frontmatter.title}</Link></h2>
    <div>{course.frontmatter.date}</div>
    <h4>{course.frontmatter.subtitle}</h4>
    <p>{course.excerpt}</p>
    {/* <div
      dangerouslySetInnerHTML={{
        __html: course.html
      }}/>   */}
  </article>
);

export default CourseListing;
