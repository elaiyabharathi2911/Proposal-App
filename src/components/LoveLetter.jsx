import { motion } from 'framer-motion'
import { letter } from '../data/content'

export default function LoveLetter() {
  return (
    <section className="section love-letter" id="letter">
      <motion.div
        className="letter-card"
        initial={{ opacity: 0, y: 50, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="letter-seal" aria-hidden="true">♥</div>
        <p className="letter-greeting">{letter.greeting}</p>
        {letter.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="letter-paragraph"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
          >
            {para}
          </motion.p>
        ))}
        <p className="letter-closing">{letter.closing}</p>
        <p className="letter-signature">{letter.signature}</p>
      </motion.div>
    </section>
  )
}
