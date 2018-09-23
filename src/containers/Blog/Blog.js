import React, { Component } from 'react';
import Posts from './Posts/Posts'
// import NewPost from './NewPost/NewPost'
import asyncComponent from '../../Hoc/asyncComponent'
import FullPost from './FullPost/FullPost'
import './Blog.css';
import axios from 'axios'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost')
})

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
              <header>
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        to="/posts"
                        exact
                        activeClassName="my-class"
                        activeStyle={{
                          color: '#fa923f',
                          textDecoration: 'underline'
                        }}>Home</NavLink>
                    </li>
                    <li>
                      <NavLink exact to={{
                          pathname: '/new-post',
                          hash: '#new',
                          search: '?type=good'
                        }}>New Post</NavLink>
                    </li>
                  </ul>
                </nav>
              </header>
              <Switch>
                <Route path="/new-post" exact component={AsyncNewPost} />
                <Route path="/posts" component={Posts} />
                <Redirect from='/' to='/posts' />
                <Route render={() => <h1>404 not found</h1>} />
              </Switch>
            </div>
        );
    }
}

export default Blog;
