import axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css'
import { faSpaghettiMonsterFlying, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

export default function App() {

  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState({
    title: "",
    body: "",
  })
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
      setPosts(response.data);
    });
  }, []);

  const deletePost = async (id) => {
      await client.delete(`${id}`);

      setPosts(
        posts.filter (
          (post) => {
            return post.id !== id;
          }
        )
      );
  }

  const addPost = async (title, body) => {
    // console.log("ME2U");

    let response = await client.post('', {
      title: values.title,
      body: values.body,
    });

    console.log("MEEEEEEE");
    console.log(response);

    setPosts([response.data, ...posts])
    setTitle('');
    setBody(''); 
  }

  const handleTitleInputChange = (event) => {
    if(submitted)
      setSubmitted(false)
    
    setValues({...values, title: event.target.value})
  }

  const handleBodyInputChange = (event) => {
    if(submitted)
      setSubmitted(false)

    setValues({...values, body: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.title && values.body)
      setValid(true)
    
    setSubmitted(true);
    addPost(title, body);
  }

  return (
    <div className='web-container'>
      {/* For Registration */}
      <div className='register'>
        <form action="" className='register-form' onSubmit={handleSubmit}>

          { submitted && valid ?
            <div className='success-message'>
                Registered Successfully
            </div>
            :
            null
          }

          <input   
            value={values.title}
            onChange = {handleTitleInputChange}
            id = 'title'
            type="text" 
            placeholder='Post Title'
            name='title'
            className='register-form-title'
          />
          {submitted && !values.title ?
            <span>Title of Post is Required</span>
            :
            null
          }
          <textarea name="body" id="body" cols="30" rows="10" onChange={handleBodyInputChange} value={values.body} className='register-form-body' placeholder='Post Content'>
          </textarea>
          {submitted && !values.body ?
            <span>Body of Post is Required</span>
            :
            null
          }
          <button className='register-form-submit' type='Submit' >
              Add Post
          </button>
        </form>
      </div>

      {/* For Display */}
      
      <div className='posts'>
      { posts.map(post => {
        return(
          <div className='display' key={post.title}>
            <p className='display-body'>{post.body}</p>
            <h1 className='display-title'>{post.title}</h1>
            <FontAwesomeIcon icon={faTrash} className='delete-icon' onClick={ () => deletePost(post.id) }/>
          </div>
        );
      })}  
      </div>


    </div>
  );

}

