import React, { useState, useEffect } from 'react';
import APIServices from './APIServices';

function UpdateForm(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        setTitle(props.post.title);
        setBody(props.post.body);
    }, [props.post]);

    const updatePost = () => {
        APIServices.UpdatePost(props.post.id, {title, body})
        .then(response => props.updateEditedPosts(response))
        .catch(error => console.log('UpdateForm error: ', error));

        setTitle('');
        setBody('');
    };

    const addPost = () => {
        APIServices.AddPost({title, body})
        .then(response => props.updateAddedPosts(response))
        .catch(error => console.log('UpdateForm error: ', error));

        setTitle('');
        setBody('');
    };

    return (
        <div id="bottom">
            {props.post ? (
                <div className="updateForm">
                    <label className="formLabel" htmlFor="title">Title</label>
                    <input
                        className="formText"
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
    
                    <label className="formLabel" htmlFor="body">Text</label>
                    <textarea 
                        className="formText"
                        id="body" 
                        rows="10" 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}/>

                    {
                        props.post.id ? (
                            <button 
                                className="interactBtn updateBtn confirmBtn"
                                onClick={() => updatePost()}>
                                    Update
                            </button>
                        ) : (
                            <button 
                                className="interactBtn updateBtn confirmBtn"
                                onClick={() => addPost()}>
                                    Add
                            </button>
                        )
                    }
                </div>
            ) : null}
        </div>
    );
}

export default UpdateForm