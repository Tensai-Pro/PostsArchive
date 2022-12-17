from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/posts_archive'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db = SQLAlchemy(app)

ma = Marshmallow(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

post_schema = PostSchema()
posts_schema = PostSchema(many=True)



# Routes
@app.route('/', methods=['GET'])
def show_posts():
    all_posts = Post.query.order_by(desc(Post.id)).all()

    return posts_schema.dump(all_posts)

@app.route('/get/<id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)

    return post_schema.dump(post)

@app.route('/add', methods=['POST'])
def add_post():
    title = request.json['title']
    body = request.json['body']

    post = Post(title, body)
    db.session.add(post)
    db.session.commit()

    return post_schema.dump(post)

@app.route('/update/<id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get(id)

    title = request.json['title']
    body = request.json['body']

    post.title = title
    post.body = body

    db.session.commit()

    return post_schema.dump(post)

@app.route('/delete/<id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    return post_schema.dump(post)



if __name__ == '__main__':
    app.run(debug=True)