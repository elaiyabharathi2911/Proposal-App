import { motion } from 'framer-motion'
import AnimatedPhoto from '../components/AnimatedPhoto'

export default function MomentScreen({ data }) {
  return (
    <div className="screen-content">
      <motion.span
        className="moment-emoji-header"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {data.emoji}
      </motion.span>
      <h2 className="screen-title">{data.title}</h2>
      <AnimatedPhoto src={data.image} alt={data.title} />
      <motion.p
        className="screen-text"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {data.body}
      </motion.p>
    </div>
  )
}
