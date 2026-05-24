import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loveQuotes } from '../data/content'

export default function QuotesScreen() {
  const [index, setIndex] = useState(0)
  const quote = loveQuotes[index]

  const next = () => setIndex((i) => (i + 1) % loveQuotes.length)
  const prev = () => setIndex((i) => (i - 1 + loveQuotes.length) % loveQuotes.length)

  return (
    <div className="screen-content quotes-screen">
      <h2 className="screen-title">Love Quotes For You 💌</h2>
      <p className="screen-subtitle">Tap arrows to read each one</p>

      <div className="quote-card-wrap">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            className="quote-card"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }}
          >
            <span className="quote-mark">"</span>
            <p>{quote.quote}</p>
            <cite>{quote.author}</cite>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="quote-nav">
        <button type="button" className="quote-btn" onClick={prev}>
          ←
        </button>
        <span className="quote-dots">
          {loveQuotes.map((_, i) => (
            <span key={i} className={i === index ? 'active' : ''} />
          ))}
        </span>
        <button type="button" className="quote-btn" onClick={next}>
          →
        </button>
      </div>
    </div>
  )
}
