import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

export default function LetterScreen({ data }) {
  const { playSuccess } = useAudio()
  const [isOpen, setIsOpen] = useState(false)

  if (!data) return null

  const backgroundStyle = data.backgroundImage
    ? {
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  const handleOpen = () => {
    playSuccess()
    setIsOpen(true)
  }

  return (
    <div
      className="screen-content letter-screen"
      style={data.backgroundImage ? { position: 'relative' } : {}}
    >
      {data.backgroundImage && (
        <div
          className="letter-background"
          style={backgroundStyle}
        />
      )}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED ENVELOPE STATE */
          <motion.div
            key="closed"
            className="envelope-container"
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotate: 5, y: -20 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="envelope-glow-aura"></div>
            <motion.div 
              className="envelope-flap"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✉️
            </motion.div>
            <h3 className="envelope-title">{data.title}</h3>
            <p className="envelope-subtitle">I kept a secret inside this letter...</p>
            
            <motion.button
              type="button"
              className="envelope-seal-btn"
              onClick={handleOpen}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 10px rgba(232, 160, 176, 0.4)',
                  '0 0 25px rgba(232, 160, 176, 0.8)',
                  '0 0 10px rgba(232, 160, 176, 0.4)'
                ]
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {data.seal || '💝'}
            </motion.button>
            <p className="envelope-hint">Tap the seal to open my heart ✨</p>
          </motion.div>
        ) : (
          /* OPEN LETTER BOX STATE */
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            className="letter-box-wrapper"
          >
            <motion.h3
              className="letter-screen-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {data.title}
            </motion.h3>
            <motion.div
              className="letter-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="letter-seal-top">{data.seal}</span>
              <p className="letter-greet">{data.greeting}</p>
              {data.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
              <p className="letter-sign">{data.signature}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
