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

exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
  const { createNodeField } = boundActionCreators;
  const lessonsInCourses = {};
  const addcourseToLesson = (node, name, value) => {
    createNodeField({
        node,
        name: name,
        value: value
    });
  }

  // iterate thorugh all markdown nodes to link lessons to courses
  // and build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === "MarkdownRemark")
    .forEach(lesson => {
      if (lesson.frontmatter.course) {
        const courseNode = getNodes().find( node2 => 
            node2.internal.type === "MarkdownRemark" &&
            node2.frontmatter.title === lesson.frontmatter.course);
        if (courseNode) {
          addcourseToLesson(lesson, "course", courseNode.id);
          // if it's first time for this course init empty array for his posts
          if (!(courseNode.id in lessonsInCourses)) {
            lessonsInCourses[courseNode.id] = [];
          }
          // add lesson to this course
          lessonsInCourses[courseNode.id].push(lesson);
        }
      }
    });

  Object.entries(lessonsInCourses).forEach(([courseNodeId, lessons]) => {
    createNodeField({
      node: getNode(courseNodeId),
      name: "lessons",
      value: lessons,
    });
  });
  getNodes().filter(node => node.internal.type === "MarkdownRemark" && 
      "course" == node.frontmatter.type &&
      !node.fields.lessons)
    .forEach(node => {
      createNodeField({
        node: node,
        name: "lessons",
        value: [],
      });
    });
};

