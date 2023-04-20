import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import SavedAnswers from '../SavedAnswers/SavedAnswers';
import { useGoogleLogin, GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { useQuery, gql, useMutation } from '@apollo/client'

const SET_USER = gql`
mutation signinUser($name: String!, $email: String!, $token: String!, $uid: String!) {
  signinUser(input: {name: $name, email: $email, token: $token, uid: $uid}) {
    user {
      id
      name
      email
    }
  }
}`

function App() {
  const [ setTheUser, {loading, error, data} ] = useMutation(SET_USER)
    const mutateUser = () => {
      const result = setTheUser({
        variables: {
          name: profile.name, 
          email: profile.email, 
          token: user, 
          uid: profile.id
        }
      })
    }

  const [todos, setTodos] = useState<any>(['Job Hunt'])
  const location = useLocation()

  const addTodo = (todo: any) => {
    setTodos([...todos, todo])
  }
  const [ profile, setProfile ] = useState<any>([]);
  const [user, setUser] = useState<any>()

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse.access_token),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    console.log('SUER', user)
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`, {
        headers: {
        Authorization: `Bearer ${user}`,
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
    setTodos([])
      // const unfinishedTodos = todos.filter((item: any) => item !== todo)
      // setTodos(unfinishedTodos)
  }

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar logOut={logOut}/>}
      <Routes>
        <Route path='/' element={<Login profile={profile} login={login} user={user} />} />
        <Route path='/home' element={<Home user={user} profile={profile} todos={todos} addTodo={addTodo} removeFromList={removeFromList} mutateUser={mutateUser} />}/>
        <Route path='/answers' element={<SavedAnswers />} />
      </Routes>
    </div>
  );
}

export default App;
