import React, { useEffect, useState } from 'react'

import { FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'

import { BackToPackListButton } from '../../../common/BackToPackListButton/BackToPackListButton'
import { randomCards } from '../../../common/util/randomCards'

import s from './TrainingCards.module.css'

import { getCardsTC } from 'bll/reducers/cardsReducer'
import { updateGradeTC } from 'bll/reducers/gradeReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { CardType } from 'dal/api/Types/apiResponseTypes'

export const TrainingCards = () => {
  const dispatch = useAppDispatch()

  let { cardsPack_id, packName } = useParams()

  const cards = useAppSelector(state => state.cards.cards)

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [grade, setGrade] = useState(1)
  const [card, setCard] = useState<CardType>({
    answer: '',
    answerImg: '',
    answerVideo: '',
    cardsPack_id: '',
    comments: '',
    created: '',
    grade: 0,
    more_id: '',
    question: '',
    questionImg: '',
    questionVideo: '',
    rating: 0,
    shots: 0,
    type: '',
    updated: '',
    user_id: '',
    __v: 0,
    _id: '',
  })

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC({ cardsPack_id, pageCount: 1000 }))
      setFirst(false)
    }

    if (cards.length > 0) setCard(randomCards(cards))

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, cardsPack_id, cards, first])

  const onNext = async () => {
    setIsChecked(false)

    if (cards.length > 0) {
      await dispatch(updateGradeTC({ grade, card_id: card._id }))
      await dispatch(getCardsTC({ cardsPack_id, pageCount: 1000 }))
      setCard(randomCards(cards))
    } else {
      console.log('error updateGradeTC')
    }
  }

  const setGradeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(Number((event.target as HTMLInputElement).value))
  }

  return (
    <div>
      <div className={s.backToPackListButton}>
        <BackToPackListButton />
      </div>
      <div className={s.trainingCardsContainer}>
        <div className={s.headerContainer}>Learn `{packName}`</div>
        <Paper elevation={3} className={s.paperContainer}>
          <div className={s.questionContainer}>
            <div className={s.questionHeader}>Question:</div>
            <div className={s.question}>{card.question}</div>
          </div>
          <div className={s.numberOfAttempts}>
            Количество попыток ответов на вопрос: {card.shots}
          </div>
          {!isChecked ? (
            <Button
              className={s.buttonsShowAnswer}
              variant={'contained'}
              onClick={() => setIsChecked(!isChecked)}
            >
              Show answer
            </Button>
          ) : (
            <div className={s.answerContainer}>
              <div className={s.answerGroup}>
                <div className={s.answerHeader}>Answer:</div>
                <div className={s.answer}>{card.answer}</div>
              </div>
              <div style={{ marginTop: '24px' }}>Rate yourself</div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={grade}
                  onChange={setGradeHandler}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Did not know" />
                  <FormControlLabel value={2} control={<Radio />} label="Forgot" />
                  <FormControlLabel value={3} control={<Radio />} label="A lot of thought" />
                  <FormControlLabel value={4} control={<Radio />} label="Confused" />
                  <FormControlLabel value={5} control={<Radio />} label="Knew the answer" />
                </RadioGroup>
              </FormControl>
              <Button variant={'contained'} className={s.buttonsShowAnswer} onClick={onNext}>
                Next
              </Button>
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}