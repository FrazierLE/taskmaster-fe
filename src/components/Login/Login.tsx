import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, TextField, CardActions, IconButton,Typography, Toolbar, AppBar } from '@mui/material'
// import { useQuery, gql, useMutation } from '@apollo/client' 

const style ={
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 275,
  maxWidth: 400,
  marginTop: '1rem',
  padding: '1rem'
}


const Login = (props: any) => {
  console.log('PROPS AT LOGIN', props)
  const navigate = useNavigate();
  // const [updatedUser, setUpdatedUser] = useState({})
  const [account, setAccount] = useState(true)
  
  const checkLogin = () => {
    props.login()
    // setUpdatedUser(props.profile)
    navigate("/home");
  }


  return(
    <div>
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <AppBar position="static">
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 4 }}
          />
      </Toolbar>
      <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Task Master
      </Typography>
      </AppBar>
    <Card sx={style}>
      <CardActions>
        <Button variant="contained" onClick={checkLogin}>Login with Google</Button>
      </CardActions>
    </Card> 
    </Container>
    </div>
  )
}

export default Login