import { motion } from 'framer-motion'
import AnimatedPhoto from '../components/AnimatedPhoto'

export default function IntroScreen({ data }) {
  return (
    <div className="screen-content">
      <motion.span className="screen-emoji-big">{data.emoji}</motion.span>
      <h2 className="screen-title">{data.title}</h2>
      <AnimatedPhoto src={data.image} alt={data.title} />
      <p className="screen-text">{data.body}</p>
    </div>
  )
}
