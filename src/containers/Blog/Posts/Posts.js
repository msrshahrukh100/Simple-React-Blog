import React from 'react'
import Post from '../../../components/Post/Post'
import axios from '../../../axios'
import './Posts.css'
import { Link, Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

class Posts extends React.Component {

  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        let truncatedPosts = response.data.slice(0, 4)
        truncatedPosts = truncatedPosts.map(post => {
          return {
            ...post,
            author: 'Shahrukh'
          }
        })
        this.setState({
          posts: truncatedPosts
        })
      })
      .catch(error => {
        this.setState({error: true})
      })
  }

  postSelectedHandler = (postId) => {
    console.log(this.props)
    this.props.history.push({pathname: '/posts/' + postId})
  }

  render() {
    let displayPosts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if(!this.state.error) {
      displayPosts = this.state.posts.map(post => {
        return (
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)} />
          /*<Link key={post.id} to={'/' + post.id}>*/
          /*</Link>*/
            )
      })
    }

    return (
      <div>
        <section className="Posts">
        {displayPosts}
        </section>
        <Route path={this.props.match.url + '/:id'} component={FullPost} />
      </div>
    )
  }
}

export default Posts
