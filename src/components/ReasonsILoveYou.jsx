import { motion } from 'framer-motion'
import { reasonsILoveYou } from '../data/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 18 },
  },
}

export default function ReasonsILoveYou() {
  return (
    <section className="section reasons-section" id="reasons">
      <div className="container">
        <motion.div
          className="section-header-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{reasonsILoveYou.subtitle}</span>
          <h2 className="section-title">{reasonsILoveYou.title}</h2>
        </motion.div>

        <motion.div
          className="reasons-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {reasonsILoveYou.reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="reason-card"
              variants={item}
              whileHover={{
                scale: 1.06,
                rotate: [0, -2, 2, 0],
                boxShadow: '0 12px 40px rgba(232, 160, 176, 0.25)',
              }}
            >
              <motion.span
                className="reason-emoji"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {reason.emoji}
              </motion.span>
              <p>{reason.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
