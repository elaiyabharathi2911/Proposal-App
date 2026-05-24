import { motion } from 'framer-motion'

const sparkles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 2,
}))

export default function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="sparkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
