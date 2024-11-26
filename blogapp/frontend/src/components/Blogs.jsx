import React, { useEffect, useState } from "react";
import storage from "../services/storage";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "./Comments";

const Blogs = ({ blogs }) => {

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div className="blogs-list">
        {[...blogs].sort(byLikes).map((blog) => 
        <p key={blog.id} className="blogs-list-item">
          <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
        </p>)}
    </div>  
  );
};

export default Blogs;