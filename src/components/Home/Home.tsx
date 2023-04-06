import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import ToDos from '../ToDosContainer/ToDos'
import BehavioralQuestion from '../BehavioralQuestion/BehavioralQuestion'
import TechChallenge from '../TechChallenge/TechChallenge'
import TechQuestion from '../TechQuestion/TechQuestion'
import { useQuery, gql, useMutation } from '@apollo/client'

const B_QUESTIONS = gql `
query BQuestions {
  bQuestions {
    id
    question
  }
}`

const T_QUESTIONS = gql `
query TQuestions {
  tQuestions {
    id
    question
  }
}
`

// const GET_USER = gql`
// query GetUser ($id: ID!) {
//   user(id: $id) {
//     id
//     name
//     email
//   }
// }
// `

const Home = (props: any) => {
  const bQuestions = useQuery(B_QUESTIONS)
  const tQuestions = useQuery(T_QUESTIONS)
  // const user = useQuery(GET_USER, {
  //   variables: { id: props.profile.id }
  // })

  useEffect(() => {
    if(props.profile) {
      props.mutateUser()
      // console.log('user', user)
    }
  }, [props.profile])

  return(
    <Container sx={{ py: 0, display: 'flex', alignItems: 'baseline'}} maxWidth="md">
    <ToDos todos={props.todos} addTodo={props.addTodo} removeFromList={props.removeFromList}/>
    <Grid container spacing={0} sx={{display: 'flex', flexDirection: 'column'}}>
      {bQuestions.data && <BehavioralQuestion bQuestions={bQuestions.data.bQuestions} profile={props.profile}/>}
      {tQuestions.data && <TechQuestion tQuestions={tQuestions.data.tQuestions} profile={props.profile}/>}
      <TechChallenge />
    </Grid>
</Container>
  )
}

export default Home