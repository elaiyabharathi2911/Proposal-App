import { motion } from 'framer-motion'
import { partnerName } from '../data/content'

const loadingEmojis = ['💕', '🎓', '✨', '💖']

export default function LoadingScreen({ error }) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loading-emojis">
        {loadingEmojis.map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          >
            {e}
          </motion.span>
        ))}
      </div>
      <p className="loading-text">
        {error
          ? '⚠️ Some photos could not load — continuing anyway... 💕'
          : `🎓 Preparing your surprise for ${partnerName}... ✨`}
      </p>
      {!error && (
        <div className="loading-bar">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
      )}
    </motion.div>
  )
}
