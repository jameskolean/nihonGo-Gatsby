import React from "react";
import Link from "gatsby-link";

const LessonListing = ({ lesson }) => (
  <ul>
    <li><Link to={lesson.fields.slug}>{lesson.frontmatter.title}</Link></li>
  </ul>
);

export default LessonListing;
