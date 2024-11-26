import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer";

import {
  loadUserReducer,
  loginReducer,
  logoutReducer,
  setUser,
} from "./reducers/userReducer";
import { fetchUsers } from "./reducers/usersReducer";

import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserReducer());
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const blogFormRef = createRef();

  const notify = (message, type = "success", timeout = 5) => {
    dispatch(setNotification(message, type, timeout));
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await dispatch(loginReducer(credentials));
      if (loginReducer.fulfilled.match(response)) {
        const user = response.payload;
        notify(`Welcome back, ${user.name}`);
      }
    } catch (error) {
      notify(`Wrong credentials ${error}`, "error");
    }
  };

  const handleLogout = () => {
    dispatch(logoutReducer());
    notify(`Bye, ${user.name}!`);
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    notify(`Blog created: ${blog.title}, ${blog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    dispatch(likeBlog(blog));
    notify(`You liked ${blog.title} by ${blog.author}`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
      navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="login-and-notification-container">
        <h1>Blogs</h1>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <header>
        <nav className="navbar">
          <div>
            <Link to="/blogs"> blogs </Link>
            <Link to="users"> users </Link>
          </div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout} className="logout-button">
              logout
            </button>
          </div>
        </nav>
      </header>
      <main className="main">
        <h1>Blogs</h1>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <NewBlog doCreate={handleCreate} />
                </Togglable>
                <Blogs blogs={blogs} />
              </>
            }
          />
          <Route path="/blogs" element={<Navigate replace to="/" />} />
          <Route
            path="/blogs/:id"
            element={
              blogs.length ? (
                <Blog
                  blogFromIdParam={blog}
                  handleVote={handleVote}
                  handleDelete={handleDelete}
                />
              ) : (
                <div>Loading...</div>
              )
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/users/:id"
            element={
              users.length ? <User users={users} /> : <div>Loading...</div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
