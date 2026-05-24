import { motion } from 'framer-motion'
import SafeImage from './SafeImage'

export default function Chapter({ chapter, index }) {
  const isReversed = index % 2 === 1

  return (
    <section className={`section chapter ${isReversed ? 'reversed' : ''}`}>
      <div className="container chapter-grid">
        <motion.div
          className="chapter-image-wrap"
          initial={{ opacity: 0, x: isReversed ? 80 : -80, rotateY: isReversed ? -15 : 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="chapter-emoji-badge"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            {chapter.emoji}
          </motion.span>
          <SafeImage src={chapter.image} alt={chapter.imageAlt} className="chapter-image" />
          <div className="chapter-image-glow" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="chapter-text"
          initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <span className="chapter-label">{chapter.label}</span>
          <h3 className="chapter-title">{chapter.title}</h3>
          <p className="chapter-body">{chapter.body}</p>
        </motion.div>
      </div>
    </section>
  )
}
