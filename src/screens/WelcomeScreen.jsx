import { motion } from 'framer-motion'
import { partnerName } from '../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 14,
    },
  },
}

export default function WelcomeScreen({ data }) {
  return (
    <motion.div
      className="screen-content welcome-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="screen-emoji-big"
        variants={itemVariants}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎓💕
      </motion.span>
      
      <motion.p className="screen-badge animate-badge-pulse" variants={itemVariants}>
        {data.badge}
      </motion.p>
      
      <motion.h1
        className="screen-title-huge name-glow-pulse"
        variants={itemVariants}
        animate={{ 
          scale: [1, 1.05, 1],
          textShadow: [
            '0 0 0px rgba(232, 160, 176, 0)', 
            '0 0 25px rgba(232, 160, 176, 0.75)', 
            '0 0 0px rgba(232, 160, 176, 0)'
          ]
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {partnerName}
      </motion.h1>
      
      <motion.p className="screen-subtitle" variants={itemVariants}>
        {data.subtitle}
      </motion.p>
      
      <motion.p className="screen-text" style={{ textAlign: 'center' }} variants={itemVariants}>
        {data.body}
      </motion.p>
      
      <motion.div
        className="welcome-float-row"
        variants={itemVariants}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {['💕', '✨', '🌸', '💖', '✨', '💕'].map((e, i) => (
          <motion.span 
            key={i} 
            animate={{ rotate: [0, 360] }} 
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
