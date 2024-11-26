import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users";
import storage from "../services/storage";

const User = ({ users }) => {
  const [user, setUser] = useState(null);

  const id = useParams().id;
  const userFromIdParam = users.find((user) => user.id === id);

  useEffect(() => {
    setUser(userFromIdParam);
  }, []);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.length === 0 ? (
        <p>{`${user.name} has not added any blogs yet`}</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
