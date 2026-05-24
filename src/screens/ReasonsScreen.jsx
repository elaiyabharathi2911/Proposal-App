import { motion } from 'framer-motion'

export default function ReasonsScreen({ data }) {
  return (
    <div className="screen-content">
      <h2 className="screen-title">Why I Love You 💝</h2>
      <p className="screen-subtitle">Preethi, here are just a few reasons...</p>
      <ul className="reasons-list">
        {data.map((r, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, x: 6 }}
          >
            <span>{r.emoji}</span> {r.text}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
