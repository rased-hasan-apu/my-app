
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [users,setUsers]=useState([]);
  const nemRef = useRef();
  const emlRef = useRef();

  useEffect(()=>{
    fetch(`http://localhost:5000/users`)
    .then(res=>res.json())
    .then(data=>{
      setUsers(data);
      console.log(data);
    
    })
  },[]);
  const handelSubmmit=(e)=>{
    const name = nemRef.current.value;
    const email= emlRef.current.value;
    const newUser = {name:name,email:email};
    // sent data to the server 
    fetch(`http://localhost:5000/users`,{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    }).then(res=>res.json())
      .then(data=>{
        const addUser = data;
        const newUser =[...users,addUser];
        setUsers(newUser);

      });
      nemRef.current.value='';
      emlRef.current.value='';
      alert('submmit sucessfully');
      e.preventDefault();
  }
  return (
    <div >
      <h1>found users:{users.length}</h1>
      <form onSubmit={handelSubmmit} action="">
        <input type="text" ref={nemRef} placeholder='name' />
        <input type="email" ref={emlRef} placeholder='email' />
        <input type="submit" value="submit" />
      </form>
      {
        users.map(user=><li>{user.id} user name: {user.name} Email: {user.email}</li>)
      }
    </div>
  );
}

export default App;
