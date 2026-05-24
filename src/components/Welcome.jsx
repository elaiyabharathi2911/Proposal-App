import { motion } from 'framer-motion'
import { partnerName, welcome } from '../data/content'

export default function Welcome({ onBegin }) {
  return (
    <section className="section welcome" id="welcome">
      <div className="welcome-bg" aria-hidden="true" />

      {/* Orbiting emojis around name */}
      <div className="welcome-orbit" aria-hidden="true">
        {welcome.emojis.map((emoji, i) => (
          <motion.span
            key={i}
            className="orbit-emoji"
            style={{
              '--orbit-i': i,
              '--orbit-total': welcome.emojis.length,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            >
              {emoji}
            </motion.span>
          </motion.span>
        ))}
      </div>

      <motion.div
        className="welcome-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <motion.div
          className="welcome-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          {welcome.badge}
        </motion.div>

        <motion.p
          className="welcome-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {welcome.subtitle}
        </motion.p>

        <motion.h1
          className="welcome-name"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 90 }}
        >
          {partnerName}
          <motion.span
            className="name-heart"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            💕
          </motion.span>
        </motion.h1>

        <motion.p
          className="welcome-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {welcome.tagline}
        </motion.p>

        <motion.div
          className="welcome-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        />

        <motion.p
          className="welcome-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {welcome.hint}
        </motion.p>

        <motion.button
          type="button"
          className="btn-begin"
          onClick={onBegin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(232, 160, 176, 0.5)' }}
          whileTap={{ scale: 0.96 }}
        >
          {welcome.button}
        </motion.button>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span>👇✨</span>
      </motion.div>
    </section>
  )
}
