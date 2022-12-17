import React from 'react';

function PostList(props) {
    return (
        <div>
            {props.posts && props.posts.map(post => {
                return (
                    <div className="post" key={post.id}>
                        <h2 className="postTitle">{post.title}</h2>
                        <p className="postBody">{post.body}</p>
                        <p className="postDate">{post.date}</p>
                        <div className="btnRow">
                            <a href="#bottom">
                                <button className="interactBtn confirmBtn" onClick={() => props.editPost(post)}>
                                    Edit
                                </button>
                            </a>
                            <button className="interactBtn deleteBtn" onClick={() => props.deletePost(post)}>Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PostList