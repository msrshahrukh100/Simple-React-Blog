import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios'

class Blog extends Component {

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
      this.setState({
        selectedPostId: postId
      })
    }


    render () {
        let displayPosts = <p style={{textAlign: 'center'}}>Something went wrong</p>
        if(!this.state.error) {
          displayPosts = this.state.posts.map(post => {
            return <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)} />
          })
        }

        return (
            <div className="Blog">
              <header>
                <nav>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/new-post">New Post</a></li>
                  </ul>
                </nav>

              </header>
                <section className="Posts">
                    {displayPosts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
