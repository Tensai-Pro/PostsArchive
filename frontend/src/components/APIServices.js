import React from "react";

export default class APIServices {
    static UpdatePost(id, post) {
        return fetch(`http://127.0.0.1:5000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json());
    }

    static AddPost(post) {
        return fetch('http://127.0.0.1:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json());
    }

    static DeletePost(id) {
        return fetch(`http://127.0.0.1:5000/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json());
    }
}