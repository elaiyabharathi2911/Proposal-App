import { motion } from 'framer-motion'
import { partnerName } from '../data/content'

export default function WelcomeScreen({ data }) {
  return (
    <div className="screen-content welcome-screen">
      <motion.span
        className="screen-emoji-big"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        🎓💕
      </motion.span>
      <p className="screen-badge">{data.badge}</p>
      <motion.h1
        className="screen-title-huge"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {partnerName}
      </motion.h1>
      <p className="screen-subtitle">{data.subtitle}</p>
      <p className="screen-text">{data.body}</p>
      <motion.div
        className="welcome-float-row"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {['💕', '✨', '🌸', '💖', '✨', '💕'].map((e, i) => (
          <span key={i}>{e}</span>
        ))}
      </motion.div>
    </div>
  )
}
