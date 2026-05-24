import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SafeImage({ src, fallbackSrc, alt, className, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [status, setStatus] = useState('loading')

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setStatus('loading')
      return
    }
    setStatus('error')
  }

  return (
    <div className={`safe-image-wrap ${className || ''}`}>
      {status === 'loading' && <div className="image-skeleton" aria-hidden="true" />}
      {status === 'error' && (
        <div className="image-fallback" role="img" aria-label={alt}>
          <span>💕</span>
          <p>{alt}</p>
        </div>
      )}
      <motion.img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={() => setStatus('loaded')}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: status === 'loaded' ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: status === 'error' ? 'none' : 'block' }}
        loading="lazy"
        {...props}
      />
    </div>
  )
}
