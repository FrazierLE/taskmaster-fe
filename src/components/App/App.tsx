import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import SavedAnswers from '../SavedAnswers/SavedAnswers';
import { useGoogleLogin, GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'


function App() {
  const [todos, setTodos] = useState<any>(['Job Hunt'])
  const location = useLocation()

  const addTodo = (todo: any) => {
    setTodos([...todos, todo])
  }
  const [ profile, setProfile ] = useState<any>([]);
  const [user, setUser] = useState<any>()

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json'
        }})
        .then((res) => {
            setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
}, [user]);

const logOut = () => {
  googleLogout();
  setProfile(null);
};
  const removeFromList = (todo: any) => {
    const unfinishedTodos = todos.filter((item: any) => item !== todo)
    setTodos(unfinishedTodos)
  }

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar logOut={logOut}/>}
      <Routes>
        <Route path='/' element={<Login profile={profile} login={login}/>} />
        <Route path='/home' element={<Home profile={profile} todos={todos} addTodo={addTodo} removeFromList={removeFromList}/>}/>
        <Route path='/answers' element={<SavedAnswers />} />
      </Routes>
    </div>
  );
}

export default App;
