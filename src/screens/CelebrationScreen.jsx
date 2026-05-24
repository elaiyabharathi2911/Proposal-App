import { motion } from 'framer-motion'
import { celebration, partnerName } from '../data/content'
import FloatingEmojis from '../components/FloatingEmojis'
import AnimatedPhoto from '../components/AnimatedPhoto'

export default function CelebrationScreen() {
  return (
    <div className="celebration-full">
      <FloatingEmojis active />
      <motion.div
        className="celebration-inner"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <motion.div
          className="celebration-emoji-burst"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          🎉💕🥰✨💖
        </motion.div>

        <AnimatedPhoto
          src={celebration.image}
          fallbackSrc={celebration.imageFallback}
          alt={celebration.imageAlt}
          className="celebration-photo"
        />

        <h1>{celebration.title}</h1>
        <p>{celebration.message.replace(/Preethi/g, partnerName)}</p>
        <p>{celebration.submessage}</p>
        <p className="celebration-footer">
          🎓 From college → Forever — {partnerName} &amp; Me 💑
        </p>
      </motion.div>
    </div>
  )
}
