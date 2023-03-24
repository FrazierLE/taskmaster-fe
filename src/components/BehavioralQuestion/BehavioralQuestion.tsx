import React, { useState, useEffect } from 'react'
import { Card, Typography, CardContent, CardActions, Button } from '@mui/material'
import AnswerModal from '../AnswerModal/AnswerModal'
import { Container } from '@mui/system'

const BehavioralQuestion = (props: any) => {
  const date = Date()
  const [dailyQuestion, setDailyQuestion] = useState('')
  const [open, setOpen] = useState(false)
  const [bQuestionId, setBQuestionId] = useState('')

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const randomizeBQuestion = () => {
      const question = props.bQuestions[Math.floor(Math.random()*props.bQuestions.length)]
      setDailyQuestion(question['question'])
      setBQuestionId(question['id'])
}

  useEffect(() => {
   randomizeBQuestion()
  }, [date])

  return(
    
    <Container>
    {open && <AnswerModal closeModal={closeModal} open={open} id={bQuestionId} profile={props.profile}/>}
    <Card sx={{ minWidth: 275, minHeight: 200, margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      Daily Behavioral Interview Question
      <CardContent sx={{display: 'flex', alignItems: 'center'}}>
        <Typography sx={{fontSize: '1.5rem'}}>
          {dailyQuestion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={randomizeBQuestion} variant="contained">Generate New Question</Button>
        <Button onClick={openModal}>Answer Question</Button>
      </CardActions>
    </Card>
    </Container>
    )
}

export default BehavioralQuestion