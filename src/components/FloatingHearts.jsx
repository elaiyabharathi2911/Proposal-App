import { motion } from 'framer-motion'

const hearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 7.5) % 85}%`,
  delay: i * 0.4,
  duration: 6 + (i % 4),
  size: 12 + (i % 3) * 6,
}))

export default function FloatingHearts({ active = true }) {
  if (!active) return null

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="heart-particle"
          style={{ left: h.left, fontSize: h.size }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}
