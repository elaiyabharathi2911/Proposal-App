import { motion } from 'framer-motion'

const EMOJIS = ['💕', '💖', '✨', '🌸', '🎓', '📚', '☕', '🦋', '💗', '🥰', '🌹', '⭐']

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  emoji: EMOJIS[i % EMOJIS.length],
  left: `${(i * 4.2) % 95}%`,
  delay: i * 0.35,
  duration: 5 + (i % 5),
  size: 14 + (i % 4) * 5,
  rotate: (i % 2 === 0 ? 1 : -1) * 360,
}))

export default function FloatingEmojis({ active = true }) {
  if (!active) return null

  return (
    <div className="floating-emojis" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="emoji-particle"
          style={{ left: p.left, fontSize: p.size }}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-15vh',
            opacity: [0, 0.85, 0.85, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
