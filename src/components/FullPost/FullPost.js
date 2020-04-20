import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };
  componentDidUpdate() {
    if (this.props.id) {
      // - This is required to prevent infinite loop.
      //   Every time the state got updated this lifecycle method
      //   will be triggered and the get method will be called.
      //   Once the get method is completed it will update the state again
      //   and hence starts the cycle all over again
      if (
        !this.state.loadedPost || // edge case
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios.get(`/posts/${this.props.id}`).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.id}`).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    // - loaded post might not be ready yet
    // - show loading message if this is the case
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    // - the loading message will be overwritten right away if there
    //   is already a previous post loaded. This can be annoying and
    //   misleading before the new post is loaded
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
