const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const setNodeFields = (basePath, baseSlug) => {
        const slug = createFilePath({
            node,
            getNode,
            basePath: basePath
        });
        createNodeField({
            node,
            name: "slug",
            value: `/${baseSlug}${slug}`
        });
    }
    const { createNodeField } = boundActionCreators;
    if (node.internal.type === "MarkdownRemark") {
        if (node.frontmatter.type === "course") {
            setNodeFields("course","courses");
        } else if (node.frontmatter.type === "lesson") {
            setNodeFields("lesson","lessons");
        }
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter{
                type
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.type === "course") {
        createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/CoursePageTmpl.js"),
            context: {
              slug: node.fields.slug
            }
          });
  
      } else if (node.frontmatter.type === "lesson") {
        createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/LessonPageTmpl.js"),
            context: {
              slug: node.fields.slug
            }
          });
        }
      });
      resolve();
    });
  });
};