import { motion } from 'framer-motion'

export default function LetterScreen({ data }) {
  if (!data) return null

  const backgroundStyle = data.backgroundImage
    ? {
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

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
            transition={{ delay: 0.25 + i * 0.12 }}
          >
            {p}
          </motion.p>
        ))}
        <p className="letter-sign">{data.signature}</p>
      </motion.div>
    </div>
  )
}
