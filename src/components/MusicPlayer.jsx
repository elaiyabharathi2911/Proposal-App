import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

export default function MusicPlayer() {
  const {
    isPlaying,
    currentTrackIndex,
    volume,
    progress,
    duration,
    soundFxEnabled,
    playlist,
    play,
    pause,
    stop,
    selectTrack,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleSoundFx,
    playClick,
  } = useAudio()

  const [isOpen, setIsOpen] = useState(false)
  const [floatingNotes, setFloatingNotes] = useState([])
  const noteIdCounter = useRef(0)

  // Floating notes emitter when music is playing
  useEffect(() => {
    if (!isPlaying) return

    const notes = ['🎵', '🎶', '💕', '✨', '💖']
    const interval = setInterval(() => {
      const note = notes[Math.floor(Math.random() * notes.length)]
      const id = noteIdCounter.current++
      
      setFloatingNotes((prev) => [
        ...prev.slice(-10), // Keep a small buffer
        {
          id,
          note,
          left: 10 + Math.random() * 80,
          scale: 0.7 + Math.random() * 0.6,
          rotate: (Math.random() - 0.5) * 40,
        },
      ])
    }, 1500) // Emit a new note every 1.5 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const toggleOpen = () => {
    playClick()
    setIsOpen(!isOpen)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = clickX / rect.width
    seek(percent * duration)
  }

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00'
    const mins = Math.floor(timeInSeconds / 60)
    const secs = Math.floor(timeInSeconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  const selectSong = (idx) => {
    playClick()
    selectTrack(idx)
  }

  const currentTrack = playlist[currentTrackIndex]

  return (
    <div className="music-widget-container">
      {/* Floating Emitter for Notes */}
      <div className="music-notes-emitter">
        <AnimatePresence>
          {isPlaying &&
            floatingNotes.map((n) => (
              <motion.span
                key={n.id}
                className="floating-note"
                style={{
                  left: `${n.left}%`,
                  fontSize: '1.25rem',
                }}
                initial={{ bottom: '10px', opacity: 1, scale: n.scale, rotate: n.rotate }}
                animate={{ bottom: '80px', opacity: 0, y: -40, x: n.rotate * 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.5, ease: 'easeOut' }}
              >
                {n.note}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Floating Button */}
      <motion.button
        type="button"
        className={`music-floating-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="vinyl-grooves"></span>
        <span className="vinyl-center">💖</span>
        
        {/* Pulsing visual rings */}
        {isPlaying && (
          <>
            <span className="music-pulse-ring delay-1"></span>
            <span className="music-pulse-ring delay-2"></span>
          </>
        )}
      </motion.button>

      {/* Control Popup Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away backdrop */}
            <div className="music-popup-overlay" onClick={toggleOpen} />

            <motion.div
              className="music-popup-card"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="music-popup-header">
                <h3>Music & Sounds 💕</h3>
                <button
                  type="button"
                  className="music-close-btn"
                  onClick={toggleOpen}
                >
                  ×
                </button>
              </div>

              {/* Now Playing Panel */}
              <div className="music-now-playing">
                <div className={`music-album-disc ${isPlaying ? 'spin' : ''}`}>
                  <div className="album-center">💍</div>
                </div>
                <div className="music-track-info">
                  <p className="track-title">{currentTrack.title}</p>
                  <p className="track-artist">{currentTrack.artist}</p>
                </div>
              </div>

              {/* CSS Visualizer Wave */}
              <div className="music-visualizer">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`visualizer-bar bar-${i + 1} ${isPlaying ? 'active' : ''}`}
                  ></span>
                ))}
              </div>

              {/* Progress Slider */}
              <div className="music-progress-container">
                <div className="music-progress-timeline" onClick={handleSeek}>
                  <div
                    className="music-progress-fill"
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                  ></div>
                  <span
                    className="music-progress-thumb"
                    style={{ left: `${duration ? (progress / duration) * 100 : 0}%` }}
                  ></span>
                </div>
                <div className="music-time-labels">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="music-controls">
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={() => { playClick(); prevTrack(); }}
                  title="Previous Song"
                >
                  ⏮️
                </button>
                {isPlaying ? (
                  <button
                    type="button"
                    className="ctrl-btn play-btn"
                    onClick={() => { playClick(); pause(); }}
                    title="Pause"
                  >
                    ⏸️
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ctrl-btn play-btn"
                    onClick={() => { playClick(); play(); }}
                    title="Play"
                  >
                    ▶️
                  </button>
                )}
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={() => { playClick(); stop(); }}
                  title="Stop"
                >
                  ⏹️
                </button>
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={() => { playClick(); nextTrack(); }}
                  title="Next Song"
                >
                  ⏭️
                </button>
              </div>

              {/* Volume Slider */}
              <div className="music-volume-container">
                <span className="vol-icon" onClick={() => { playClick(); setVolume(volume > 0 ? 0 : 0.5); }}>
                  {volume === 0 ? '🔈' : volume < 0.5 ? '🔉' : '🔊'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="music-volume-slider"
                />
              </div>

              {/* Sound FX Settings Toggle */}
              <div className="music-fx-container">
                <span className="fx-label">
                  ✨ Game Sound Effects
                </span>
                <button
                  type="button"
                  className={`fx-toggle-switch ${soundFxEnabled ? 'active' : ''}`}
                  onClick={() => { playClick(); toggleSoundFx(); }}
                >
                  <span className="toggle-thumb"></span>
                </button>
              </div>

              {/* Playlist Section */}
              <div className="music-playlist-section">
                <h4>Surprise Playlist 🎼</h4>
                <ul className="music-playlist-list">
                  {playlist.map((track, index) => (
                    <li
                      key={index}
                      className={`music-playlist-item ${currentTrackIndex === index ? 'active' : ''}`}
                      onClick={() => selectSong(index)}
                    >
                      <span className="playlist-track-icon">
                        {currentTrackIndex === index && isPlaying ? '🎵' : '💿'}
                      </span>
                      <span className="playlist-track-title">{track.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
