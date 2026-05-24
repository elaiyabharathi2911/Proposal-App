import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { proposal } from '../data/content'

const floatingRings = ['💍', '💕', '✨', '💖', '🌹']

export default function Proposal({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })

  const noMessage = proposal.noResponses[Math.min(noCount, proposal.noResponses.length - 1)]
  const noScale = Math.max(0.45, 1 - noCount * 0.08)

  const dodgeNo = useCallback(() => {
    const maxX = Math.min(140, 50 + noCount * 18)
    const maxY = Math.min(100, 40 + noCount * 12)
    setNoPos({
      x: (Math.random() - 0.5) * 2 * maxX,
      y: (Math.random() - 0.5) * 2 * maxY,
    })
    setNoCount((c) => c + 1)
  }, [noCount])

  return (
    <section className="section proposal" id="proposal">
      <div className="proposal-floaters" aria-hidden="true">
        {floatingRings.map((e, i) => (
          <motion.span
            key={i}
            className="proposal-floater"
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4], rotate: [0, 360] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 25}%` }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="proposal-inner"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="proposal-ring"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💍
        </motion.div>

        <motion.p
          className="proposal-preamble"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {proposal.preamble}
        </motion.p>

        <motion.h2
          className="proposal-question"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        >
          {proposal.question}
        </motion.h2>

        <motion.p
          className="proposal-subtext"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {proposal.subtext}
        </motion.p>

        <AnimatePresence mode="wait">
          {noCount > 0 && (
            <motion.p
              key={noCount}
              className="proposal-tease"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {noMessage}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="proposal-buttons">
          <motion.button
            type="button"
            className="btn-yes"
            onClick={onYes}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(232, 160, 176, 0.4)',
                '0 0 60px rgba(244, 212, 168, 0.7)',
                '0 0 30px rgba(232, 160, 176, 0.4)',
              ],
            }}
            transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
          >
            {proposal.yesLabel}
          </motion.button>

          <motion.button
            type="button"
            className="btn-no"
            onClick={dodgeNo}
            onMouseEnter={noCount >= 1 ? dodgeNo : undefined}
            animate={{ x: noPos.x, y: noPos.y, scale: noScale }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {proposal.noLabel}
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
