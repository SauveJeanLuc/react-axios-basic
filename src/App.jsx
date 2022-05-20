import axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css'

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

export default function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
      setPosts(response.data);
    });
  }, []);

  

  return (
    <div>

      { posts.map(post => {
        return(
          <div>
            <h1 style={{color:'red'}}>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        );
      })}  

    </div>
  );

}

