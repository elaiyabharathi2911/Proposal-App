import { useState } from 'react'
import { motion } from 'framer-motion'
import { games } from '../data/content'

export default function LoveQuizGame({ onComplete }) {
  const { questions } = games.quiz
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(false)

  const q = questions[step]

  const choose = (index) => {
    if (picked !== null) return
    setPicked(index)
    if (index === q.correct) setScore((s) => s + 1)
    setTimeout(() => {
      if (step + 1 >= questions.length) {
        setDone(true)
        onComplete?.()
      } else {
        setStep((s) => s + 1)
        setPicked(null)
      }
    }, 900)
  }

  if (done) {
    return (
      <div className="game-result win">
        <span>💝</span>
        <p>{games.quiz.winMessage}</p>
        <p className="quiz-score">
          {score}/{questions.length} — Perfect! 🥰
        </p>
      </div>
    )
  }

  return (
    <div className="game-area quiz-game">
      <h3>{games.quiz.title}</h3>
      <p className="game-instruction">{games.quiz.instruction}</p>
      <p className="quiz-progress">
        Question {step + 1}/{questions.length}
      </p>
      <motion.p key={step} className="quiz-question" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {q.q}
      </motion.p>
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            type="button"
            className={`quiz-opt ${picked === i ? (i === q.correct ? 'correct' : 'wrong') : ''} ${picked !== null && i === q.correct ? 'correct' : ''}`}
            onClick={() => choose(i)}
            whileHover={{ scale: picked === null ? 1.02 : 1 }}
            disabled={picked !== null}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
