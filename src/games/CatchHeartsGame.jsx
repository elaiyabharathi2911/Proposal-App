import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { games } from '../data/content'
import { useAudio } from '../context/AudioContext'

const TARGET = 12
const TIME = 25

export default function CatchHeartsGame({ onComplete }) {
  const { playHeartCatch, playSuccess } = useAudio()
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(TIME)
  const [hearts, setHearts] = useState([])
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)

  const spawnHeart = useCallback(() => {
    const id = Date.now() + Math.random()
    setHearts((h) => [...h.slice(-15), { id, left: 10 + Math.random() * 80 }])
  }, [])

  useEffect(() => {
    if (won || lost) return
    const t = setInterval(() => setTime((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [won, lost])

  useEffect(() => {
    if (won || lost || time <= 0) return
    const s = setInterval(spawnHeart, 700)
    return () => clearInterval(s)
  }, [won, lost, time, spawnHeart])

  useEffect(() => {
    if (time <= 0 && !won) setLost(true)
  }, [time, won])

  useEffect(() => {
    if (score >= TARGET) {
      playSuccess()
      setWon(true)
      onComplete?.()
    }
  }, [score, onComplete, playSuccess])

  const catchHeart = (id) => {
    playHeartCatch()
    setHearts((h) => h.filter((x) => x.id !== id))
    setScore((s) => s + 1)
  }

  if (won) {
    return (
      <div className="game-result win">
        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          💖
        </motion.span>
        <p>{games.hearts.winMessage}</p>
      </div>
    )
  }

  if (lost) {
    return (
      <div className="game-result">
        <p>Time up! But you already have my heart 💕</p>
        <button type="button" className="btn-retry" onClick={() => { setScore(0); setTime(TIME); setLost(false); setHearts([]) }}>
          Retry 🔄
        </button>
        <button type="button" className="btn-retry" style={{ marginLeft: '0.5rem' }} onClick={() => { playSuccess(); setWon(true); onComplete?.() }}>
          Continue → 💕
        </button>
      </div>
    )
  }

  return (
    <div className="game-area catch-game">
      <h3>{games.hearts.title}</h3>
      <p className="game-instruction">{games.hearts.instruction}</p>
      <div className="game-stats">
        <span>💕 {score}/{TARGET}</span>
        <span>⏱️ {time}s</span>
      </div>
      <div className="catch-zone">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.button
              key={h.id}
              type="button"
              className="falling-heart"
              style={{ left: `${h.left}%` }}
              initial={{ top: '-10%', opacity: 1 }}
              animate={{ top: '95%', opacity: [1, 1, 0] }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 3.5, ease: 'linear' }}
              onClick={() => catchHeart(h.id)}
            >
              💕
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
