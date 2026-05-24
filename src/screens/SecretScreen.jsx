import { motion } from 'framer-motion'
import AnimatedPhoto from '../components/AnimatedPhoto'

export default function SecretScreen({ data }) {
  return (
    <div className="screen-content secret-screen">
      <motion.span
        className="screen-emoji-big"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {data.emoji}
      </motion.span>
      <h2 className="screen-title">{data.title}</h2>
      <AnimatedPhoto src={data.image} alt="Secret love" />
      <motion.p
        className="screen-text highlight-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {data.body}
      </motion.p>
    </div>
  )
}
