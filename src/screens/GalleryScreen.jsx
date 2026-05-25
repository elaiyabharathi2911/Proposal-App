import { motion } from 'framer-motion'
import { gallery } from '../data/content'
import SafeImage from '../components/SafeImage'

export default function GalleryScreen() {
  return (
    <div className="screen-content gallery-screen">
      <h2 className="screen-title">{gallery.title}</h2>
      <div className="gallery-grid-compact">
        {gallery.photos.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <SafeImage src={p.src} alt={p.caption} className="gallery-thumb" />
            <figcaption>{p.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="screen-hint">💡 Sorry our  real college photos is not available</p>
    </div>
  )
}
