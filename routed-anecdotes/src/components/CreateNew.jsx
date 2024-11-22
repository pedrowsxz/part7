import { useState } from "react"
import { useField } from "../hooks"

const CreateNew = (props) => {
  //const [content, setContent] = useState('')
  //const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.resetValue(),
    author.resetValue(),
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>     
    </div>
  )
}

export default CreateNew