import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import loginService from "./services/login";
import storage from "./services/storage";
import usersService from "./services/users"

import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer";

import { loadUserReducer, loginReducer, logoutReducer, setUser } from "./reducers/userReducer"; 

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user)

  const blogs = useSelector((state) => state.blogs);
  
  const [users, setUsers ] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadUserReducer())
  }, []);

  useEffect(() => {
    usersService.getAllUsers().then(users => setUsers(users))
  }, [])

  const blogFormRef = createRef();

  const notify = (message, type = "success", timeout = 5) => {
    dispatch(setNotification(message, type, timeout));
  };

  const handleLogin = async (credentials) => {
    try {
      dispatch(loginReducer(credentials))
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify(`Wrong credentials ${error}`, "error");
    }
  };

  const handleLogout = () => {
    dispatch(logoutReducer())
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
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <Routes>
        <Route path="/"
          element = {
            <>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog doCreate={handleCreate} />
              </Togglable>
              {[...blogs].sort(byLikes).map((blog) => (<Blog key={blog.id} blog={blog} handleVote={handleVote} handleDelete={handleDelete} />))}
            </>
          } />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={users.length ? <User users={users} /> : <div>Loading...</div>} />
      </Routes>
    </Router>
  );
};

export default App;
