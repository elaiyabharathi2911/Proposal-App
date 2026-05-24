import { motion } from 'framer-motion'
import { collegeMoments } from '../data/content'

export default function CollegeMoments() {
  return (
    <section className="section moments-section" id="moments">
      <div className="container">
        <motion.div
          className="section-header-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{collegeMoments.subtitle}</span>
          <h2 className="section-title">{collegeMoments.title}</h2>
        </motion.div>

        <div className="moments-cloud">
          {collegeMoments.moments.map((m, i) => (
            <motion.div
              key={i}
              className="moment-bubble"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.07,
                type: 'spring',
                stiffness: 260,
                damping: 15,
                y: { duration: 2.5, repeat: Infinity, delay: i * 0.2 },
              }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              animate={{ y: [0, -6, 0] }}
            >
              <motion.span
                className="moment-emoji"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
              >
                {m.emoji}
              </motion.span>
              <span>{m.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
