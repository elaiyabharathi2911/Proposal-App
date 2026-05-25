import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { proposal } from '../data/content'
import { useAudio } from '../context/AudioContext'
import AnimatedPhoto from '../components/AnimatedPhoto'

export default function ProposalScreen({ onYes }) {
  const { playClick, playYes } = useAudio()
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })

  const noMessage = proposal.noResponses[Math.min(noCount, proposal.noResponses.length - 1)]

  const dodgeNo = useCallback(() => {
    playClick()
    setNoPos({
      x: (Math.random() - 0.5) * (80 + noCount * 20),
      y: (Math.random() - 0.5) * (60 + noCount * 15),
    })
    setNoCount((c) => c + 1)
  }, [noCount, playClick])

  const handleYes = () => {
    playYes()
    onYes?.()
  }

  return (
    <div className="screen-content proposal-screen">
      <motion.div
        className="proposal-heart-big"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💕
      </motion.div>

      <AnimatedPhoto
        src={proposal.image}
        fallbackSrc={proposal.imageFallback}
        alt={proposal.imageAlt}
        className="proposal-photo"
      />

      <p className="screen-subtitle">{proposal.preamble}</p>
      <motion.h2
        className="proposal-question-big"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {proposal.question}
      </motion.h2>
      <p className="screen-text proposal-subtext-center">{proposal.subtext}</p>

      <AnimatePresence>
        {noCount > 0 && (
          <motion.p key={noCount} className="proposal-tease" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {noMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="proposal-btns">
        <motion.button
          type="button"
          className="btn-yes-big"
          onClick={handleYes}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {proposal.yesLabel}
        </motion.button>
        <motion.button
          type="button"
          className="btn-no-small"
          onClick={dodgeNo}
          onMouseEnter={noCount >= 1 ? dodgeNo : undefined}
          animate={{ x: noPos.x, y: noPos.y, scale: Math.max(0.5, 1 - noCount * 0.08) }}
        >
          {proposal.noLabel}
        </motion.button>
      </div>
    </div>
  )
}
