import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const Comments = () => {

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  const id = useParams().id

  useEffect(() => {
    axios.get(`/api/blogs/${id}/comments`)
    .then(response => setComments(response.data))
  }, [id])

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const doCreateComment = async (comment) => {
    const response = await axios.post(`/api/blogs/${id}/comments`, comment)
    setComments(comments.concat(response.data))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    doCreateComment({content, id})
    setContent('')
  }

  return (
    <div>
        <h2>comments</h2>
        <form onSubmit={handleCommentSubmit}>
            <input type="text" value={content} onChange={handleContentChange}/>
            <button type="submit">add comment</button>
        </form>
        {comments.length > 0 ? 
            <ul>
            {comments.map(comment => <li key={comment.id} >{comment.content}</li>)}
            </ul> 
        : <p>no comments yet</p>}       
    </div>
  );
};

export default Comments;
