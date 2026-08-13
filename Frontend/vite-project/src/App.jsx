import { useState } from 'react'
import './App.css'
import api from './axios.js';

function App() {
  const[name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [screen , setScreen] = useState(0);
  const [message , setMessage ] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      if(!name || !email || !password){
        return;
      }

      const response = await api.post("/user/register",{name , email, password})
    }
    catch(error){
    return;
  }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      if(!email || !password){
        return;
      }

      const response = await api.post("/user/login",{email, password},{withCredentials : true})
      const token = response.data.accessToken;

      localStorage.setItem("accessToken",token);
      setScreen(2)
    }
    catch(error){
      return;
  }
  }

  const getProfile = async () => {
    try{
      const accessToken = localStorage.getItem("accessToken")
      const response = await api.get("/user/profile",{headers : {Authorization : `Bearer ${accessToken}`}})

      setMessage(response.data.userId)
    }
    catch(error){
      return;
  }
  }



  return (
    <>
    <div className='form'>
      {screen == 0 && (<>
      <h1>Registration Form </h1>
     <form onSubmit={(e) => handleRegister(e)}>
      <input type="text" placeholder='xavier' onChange={(e) => setName(e.target.value)}/><br/>
       <input type="email" placeholder='example@gamil.com' onChange={(e) => setEmail(e.target.value)}/><br/>
      <input type="password" placeholder='xxxxxxxx' onChange={(e) => setPassword(e.target.value)}/><br/>
      <button type='submit'>Register</button>
     </form>
      </>)}

      {screen == 1 && (<>
      <h1>Login Form </h1>
      <form onSubmit={(e) => handleLogin(e)}>
      <input type="email" placeholder='example@gamil.com' onChange={(e) => setEmail(e.target.value)}/><br/>
      <input type="password" placeholder='xxxxxxxx' onChange={(e) => setPassword(e.target.value)}/><br/>
      <button type='submit'>Login</button>
      {message && <p>{message}</p>}<br/>
      <button onClick={() => getProfile()}>Get Profile</button>
      </form>
      </>)}  

      {screen == 2 && (<>
      {message && <p>{message}</p>}<br/>
      <button onClick={() => getProfile()}>Get Profile</button>
      </>)}

      {screen == 1 && <button onClick={() => setScreen(0)}>Go to Register</button>}
      {screen == 0 && <button onClick={() => setScreen(1)}>Go to Login</button>}
    </div>
    </>
  )
}

export default App
