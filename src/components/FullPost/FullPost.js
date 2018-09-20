import React, { Component } from 'react';
// import axios from 'axios'
import axios from '../../axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
      post: null
    }
    componentDidUpdate() {
      if(this.props.id) {
        if(!this.state.post || (this.state.post.id !== this.props.id)) {
          axios.get('/posts/' + this.props.id)
          .then(response => {
            this.setState({post: response.data})
          })
        }
      }
    }

    postDeleteHandler = () => {
      axios.delete('/posts/' + this.props.id)
        .then(response => {
          console.log(response)
        })
    }

    render () {

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
          post = <p style={{textAlign: 'center'}}>Loading ..</p>;
        }
        if(this.state.post) {
          const showPost = this.state.post
          post = (
            <div className="FullPost">
            <h1>{showPost.title}</h1>
            <p>{showPost.body}</p>
            <div className="Edit">
            <button className="Delete" onClick={this.postDeleteHandler}>Delete</button>
            </div>
            </div>

          );
        }
        return post;
    }
}

export default FullPost;
