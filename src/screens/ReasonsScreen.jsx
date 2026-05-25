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
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 70, 
              damping: 12, 
              delay: i * 0.15 
            }}
            whileHover={{ 
              scale: 1.03, 
              x: 8, 
              borderColor: 'rgba(232, 160, 176, 0.6)', 
              boxShadow: '0 8px 24px rgba(232, 160, 176, 0.25)',
              background: 'rgba(232, 160, 176, 0.08)'
            }}
            style={{ transition: 'border-color 0.2s, background-color 0.2s' }}
          >
            <span>{r.emoji}</span> {r.text}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
