import { motion } from 'framer-motion'
import { collegeTimeline } from '../data/content'

export default function CollegeTimeline() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="container">
        <motion.div
          className="section-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">{collegeTimeline.subtitle}</span>
          <h2 className="section-title">{collegeTimeline.title}</h2>
        </motion.div>

        <div className="timeline">
          {collegeTimeline.events.map((event, i) => (
            <motion.div
              key={event.year}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.7, type: 'spring' }}
            >
              <motion.div
                className="timeline-dot"
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              >
                <span className="timeline-emoji">{event.emoji}</span>
              </motion.div>
              <motion.div
                className="timeline-card"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="timeline-year">{event.year}</span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
