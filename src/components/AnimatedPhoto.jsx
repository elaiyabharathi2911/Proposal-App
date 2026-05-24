import { motion } from 'framer-motion'
import SafeImage from './SafeImage'

export default function AnimatedPhoto({ src, fallbackSrc, alt, className = '' }) {
  return (
    <motion.div
      className={`animated-photo ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
    >
      <motion.div
        className="photo-glow"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SafeImage
          src={src}
          fallbackSrc={fallbackSrc}
          alt={alt}
          className="animated-photo-img"
        />
      </motion.div>
      <motion.span
        className="photo-sparkle photo-sparkle-1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.span>
      <motion.span
        className="photo-sparkle photo-sparkle-2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        💕
      </motion.span>
    </motion.div>
  )
}
