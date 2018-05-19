import React from "react";
import Link from "gatsby-link";

const LessonListing = ({ lesson }) => (
  <article>
    <h3><Link to={lesson.fields.slug}>{lesson.frontmatter.title}</Link></h3>
    <div>{lesson.frontmatter.date}</div>
    <p>{lesson.excerpt}</p>
  </article>
);

export default LessonListing;
