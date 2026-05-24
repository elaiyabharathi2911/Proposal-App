import { motion, AnimatePresence } from 'framer-motion'
import { SCREEN_ORDER, getScreenLabel } from '../data/content'

const slide = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
}

export default function ScreenLayout({
  screenId,
  screenIndex,
  children,
  onNext,
  onBack,
  nextLabel = 'Continue →',
  nextDisabled = false,
  hideNext = false,
  hideBack = false,
}) {
  const total = SCREEN_ORDER.length
  const progress = ((screenIndex + 1) / total) * 100

  return (
    <div className="screen-layout">
      <header className="screen-header">
        <div className="screen-progress-track">
          <motion.div
            className="screen-progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="screen-step">
          Screen {screenIndex + 1} / {total} · {getScreenLabel(screenId)}
        </p>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={screenId}
          className="screen-body"
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <footer className="screen-footer">
        {!hideBack && screenIndex > 0 && (
          <motion.button
            type="button"
            className="btn-nav btn-back"
            onClick={onBack}
            whileTap={{ scale: 0.96 }}
          >
            ← Back
          </motion.button>
        )}
        {!hideNext && (
          <motion.button
            type="button"
            className="btn-nav btn-next"
            onClick={onNext}
            disabled={nextDisabled}
            whileHover={{ scale: nextDisabled ? 1 : 1.04 }}
            whileTap={{ scale: nextDisabled ? 1 : 0.97 }}
          >
            {nextLabel}
          </motion.button>
        )}
      </footer>
    </div>
  )
}
