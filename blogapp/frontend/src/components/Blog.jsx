import React, { useEffect, useState } from "react";
import storage from "../services/storage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "./Comments";

const Blog = ({ blogFromIdParam, handleVote, handleDelete }) => {
  const [blog, setBlog] = useState({});

  useEffect(() => {
    setBlog(blogFromIdParam);
  }, [blogFromIdParam.id, blogFromIdParam]);

  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  console.log(blog.user, storage.me(), canRemove);

  if (!blog) {
    return <div>User not found</div>;
  }

  return (
    <div className="blog">
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="likes-text">
          likes {blog.likes}
          <button
            className="like-button"
            style={{ marginLeft: 3 }}
            onClick={() => handleVote(blog)}
          >
            like
          </button>
        </div>
        <div>added by {nameOfUser}</div>
        {canRemove && (
          <button
            className="remove-blog-button"
            onClick={() => handleDelete(blog)}
          >
            remove
          </button>
        )}
      </div>
      <Comments />
    </div>
  );
};

export default Blog;
