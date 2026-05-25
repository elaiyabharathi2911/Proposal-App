import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClickHeartEmitter() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't spawn particles if clicking inside the volume slider or interactive components if needed
      // but standard taps anywhere is extremely fun, so let's allow it everywhere!
      
      const x = e.clientX || (e.touches && e.touches[0]?.clientX)
      const y = e.clientY || (e.touches && e.touches[0]?.clientY)

      if (x === undefined || y === undefined) return

      const heartIcons = ['💖', '💕', '🌸', '✨', '❤️', '💝']
      const count = 4 + Math.floor(Math.random() * 3) // Spawn 4-6 particles
      const newParticles = []

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5 // Radial layout with random offset
        const speed = 40 + Math.random() * 60
        const id = Date.now() + Math.random()
        const char = heartIcons[Math.floor(Math.random() * heartIcons.length)]
        
        newParticles.push({
          id,
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed - 50, // Bias slightly upwards
          char,
          scale: 0.5 + Math.random() * 0.7,
          rotate: Math.random() * 360,
          duration: 1.2 + Math.random() * 0.8,
        })
      }

      setParticles((prev) => [...prev.slice(-30), ...newParticles]) // Cap at 30 to preserve performance
    };

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('touchstart', handleGlobalClick)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('touchstart', handleGlobalClick)
    }
  }, [])

  // Periodically clean up old particles
  useEffect(() => {
    if (particles.length === 0) return
    const interval = setInterval(() => {
      const now = Date.now()
      // Remove particles older than 2 seconds
      setParticles((prev) => prev.filter((p) => now - p.id < 2000))
    }, 1000)

    return () => clearInterval(interval)
  }, [particles])

  return (
    <div className="click-particles-container">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="click-particle-item"
            style={{
              left: p.x,
              top: p.y,
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9999,
              userSelect: 'none',
            }}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{
              scale: p.scale,
              opacity: [1, 1, 0],
              x: p.dx * 1.5,
              y: p.dy * 1.8 - 60, // Accelerate upward drift
              rotate: p.rotate + 90,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: 'easeOut' }}
          >
            {p.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
