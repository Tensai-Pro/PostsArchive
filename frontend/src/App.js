import './App.css';
import { useState, useEffect } from 'react';
import PostList from './components/PostList';
import UpdateForm from './components/UpdateForm';
import APIServices from './components/APIServices';

function App() {
  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setPosts(response))
    .catch(error => console.log('SOME ERROR: ' + error));
  }, []);

  const editPost = (post) => {
    setEditedPost(post);
  };

  const updateEditedPosts = (editedPost) => {
    const updatedPosts = posts.map(post => {
      if (post.id === editedPost.id) {
        return editedPost;
      }
      else {
        return post;
      }
    });
    
    setPosts(updatedPosts)
    setEditedPost(null);
  };

  const addNewPost = () => {
    setEditedPost({title: '', body: ''});
  };

  const updateAddedPosts = (post) => {
    const updatedPosts = [post, ...posts];

    setPosts(updatedPosts);
    setEditedPost(null);
  };

  const deletePost = (post) => {
    APIServices.DeletePost(post.id)
    .then(response => updateDeletedPosts(response));
  };

  const updateDeletedPosts = (deletedPost) => {
    const updatedPosts = posts.filter(post => {
      if (post.id === deletedPost.id) {
        return false;
      }
      return true;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Posts Archive</h1>
        <a href="#bottom">
          <button className="interactBtn newPostBtn confirmBtn"
                onClick={() => addNewPost()}>
                  New post
          </button>
        </a>
      </div>

      <PostList posts={posts} editPost={editPost} deletePost={deletePost}/>

      {editedPost ? <UpdateForm post={editedPost} 
                                updateEditedPosts={updateEditedPosts} 
                                updateAddedPosts={updateAddedPosts}/>  : null}

    </div>
  );
}

export default App;
