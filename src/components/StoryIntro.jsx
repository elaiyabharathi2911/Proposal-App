import { motion } from 'framer-motion'
import { storyIntro } from '../data/content'

export default function StoryIntro() {
  return (
    <section className="section story-intro" id="story">
      <motion.div
        className="container narrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span
          className="intro-emoji-big"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
        >
          {storyIntro.emoji}
        </motion.span>

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          🎓 Our College Love Story
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {storyIntro.title}
        </motion.h2>

        <motion.p
          className="section-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {storyIntro.body}
        </motion.p>
      </motion.div>
    </section>
  )
}
