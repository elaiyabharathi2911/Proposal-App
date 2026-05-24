import { motion } from 'framer-motion'
import { gallery } from '../data/content'
import SafeImage from './SafeImage'

export default function MemoryGallery() {
  return (
    <section className="section gallery" id="memories">
      <div className="container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">{gallery.subtitle}</span>
          <h2 className="section-title">{gallery.title}</h2>
        </motion.div>

        <div className="gallery-grid">
          {gallery.photos.map((photo, i) => (
            <motion.figure
              key={i}
              className="gallery-item"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <SafeImage src={photo.src} alt={photo.caption} className="gallery-image" />
              <figcaption>{photo.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
