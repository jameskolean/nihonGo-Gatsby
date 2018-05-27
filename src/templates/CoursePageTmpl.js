import React, { Component } from "react";
import LessonListing from "../components/course/lesson-listing";
import axios from 'axios';

export default class CoursePageTmpl extends Component {


constructor(props) {
  super(props);

  this.state = {
    users: []
  };
}

componentDidMount() {
  axios.get('https://randomuser.me/api?results=2')
    .then(res => {
      const users = res.data.results.map(obj => obj);
      this.setState({ users });
    });

}

render() {
    const { data } = this.props;
    return (
      <article>
        <h2>{data.markdownRemark.frontmatter.title}</h2>
        <h5>{data.markdownRemark.frontmatter.subtitle}</h5>
        <h3>Students currently logged in</h3>
        <ul>
          {this.state.users.map(user => { 
            console.log(user.id.value);
            return (<li key={user.id.value}>{user.name.first} {user.name.last}</li>)
          })}
        </ul>
        <h3>Lessons</h3>
        {data.markdownRemark.fields.lessons.map( node  => (
          <LessonListing key={node.id} lesson={node} />
        ))}
        <hr/>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html
          }}
        />
        <span>{data.markdownRemark.frontmatter.date}</span>

      </article>
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
