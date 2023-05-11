import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');

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
      </div>
    </>
  )
}

export default App
