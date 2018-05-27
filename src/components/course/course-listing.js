import React from "react";
import Link from "gatsby-link";

const CourseListing = ({ course }) => (
  <article>
    <hr/>
    <h4>
      <Link to={course.fields.slug}>{course.frontmatter.title}</Link>
    </h4>
    <h5>{course.frontmatter.subtitle}</h5>
    <p>{course.excerpt}</p>
  </article>
);

export default CourseListing;
