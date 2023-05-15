import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [posts, setPosts] = useState({});

  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('date', date);
    formData.append('image', image);

    const url = `${apiUrl}/post`;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      } ,
    };
    const response = await axios.post(url, formData, config);
    console.log(response);
  }

  const showPosts = async() => {
    const url = `${apiUrl}/posts`;
    setPosts(await axios.get(url));
  }

  useEffect(() => {
    showPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(posts.data);

  return (
    <>
      <div>
        <h1>Create a new Post.</h1>
        <form style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }} onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="Enter user name" onChange={event => setUserName(event.target.value)} required />
          <input type="date" name="date" onChange={event => setDate(event.target.value)} required />
          <input type="file" name="image" onChange={event => setImage(event.target.files[0])} required />
          <button type='submit' style={{ border: "1px solid black" }}>Submit</button>
        </form>
        <div>
          <h1>Posts</h1>
          {posts.data !== undefined && posts.data.data.length > 0 && (
            <div>
              {posts.data.data.map(post => (
                <div key={post.id} style={{border: "5px solid blue", borderRadius: "5px", margin: "5px"}}>
                  <h3>{post.userName} ({post.date})</h3>
                  <img src={`${apiUrl}/postImages/${post.image}`} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
