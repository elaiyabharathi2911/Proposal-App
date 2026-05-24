import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { games } from '../data/content'

const PAIRS = ['💕', '🎓', '✨', '🌸', '💖', '📚']

function shuffle(arr) {
  const a = [...arr, ...arr].map((emoji, i) => ({ id: i, emoji, key: `${emoji}-${i}` }))
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemoryMatchGame({ onComplete }) {
  const [cards, setCards] = useState(() => shuffle(PAIRS))
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [won, setWon] = useState(false)

  useEffect(() => {
    if (flipped.length !== 2) return
    const [a, b] = flipped
    if (cards[a].emoji === cards[b].emoji) {
      setMatched((m) => [...m, a, b])
      setFlipped([])
    } else {
      const t = setTimeout(() => setFlipped([]), 800)
      return () => clearTimeout(t)
    }
  }, [flipped, cards])

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setWon(true)
      onComplete?.()
    }
  }, [matched, cards.length, onComplete])

  const flip = (index) => {
    if (flipped.length >= 2 || flipped.includes(index) || matched.includes(index)) return
    setFlipped((f) => [...f, index])
  }

  if (won) {
    return (
      <div className="game-result win">
        <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          🎉
        </motion.span>
        <p>{games.memory.winMessage}</p>
      </div>
    )
  }

  return (
    <div className="game-area memory-game">
      <h3>{games.memory.title}</h3>
      <p className="game-instruction">{games.memory.instruction}</p>
      <div className="memory-grid">
        {cards.map((card, i) => {
          const isOpen = flipped.includes(i) || matched.includes(i)
          return (
            <motion.button
              key={card.key}
              type="button"
              className={`memory-card ${isOpen ? 'open' : ''} ${matched.includes(i) ? 'matched' : ''}`}
              onClick={() => flip(i)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? card.emoji : '?'}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
