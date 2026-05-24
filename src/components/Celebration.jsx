import { motion } from 'framer-motion'
import { celebration, partnerName } from '../data/content'
import FloatingEmojis from './FloatingEmojis'

const confettiEmojis = ['💕', '💖', '🎉', '✨', '💍', '🥰', '🌹', '🎓', '⭐', '💗']

const confetti = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 2,
  emoji: confettiEmojis[i % confettiEmojis.length],
  size: 16 + Math.random() * 20,
}))

export default function Celebration() {
  return (
    <motion.section
      className="section celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingEmojis active />
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="confetti-emoji"
            style={{ left: c.left, fontSize: c.size }}
            initial={{ y: -30, opacity: 1, rotate: 0 }}
            animate={{ y: '105vh', opacity: [1, 1, 0], rotate: 720 }}
            transition={{ duration: 3 + Math.random() * 2, delay: c.delay, ease: 'easeIn' }}
          >
            {c.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="celebration-content"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
      >
        <div className="celebration-emoji-row">
          {celebration.emojis.map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
            >
              {e}
            </motion.span>
          ))}
        </div>

        <motion.h2
          className="celebration-title"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {celebration.title}
        </motion.h2>

        <p className="celebration-message">
          {celebration.message.replace(/Preethi/g, partnerName)}
        </p>
        <p className="celebration-sub">{celebration.submessage}</p>

        <motion.p
          className="celebration-names"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          🎓 From college days → Forever 💍 — You &amp; {partnerName} 💕
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
