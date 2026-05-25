import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
const AudioContext = createContext(null)

const PLAYLIST = [
  {
    title: 'Google Google (Thuppakki) 🎓',
    artist: 'Vijay & Preethi Theme Beats',
    url: '/music/google-google.mp3',
  },
  {
    title: 'Yaar Indha Saalai Oram (Thalaivaa) 🛣️',
    artist: 'GV Prakash — Walking Beside You',
    url: '/music/Yaar-Indha-Saalai-Oram.mp3',
  },
  {
    title: 'En Jeevan (Theri) 💖',
    artist: 'GV Prakash — My Soul, My Life',
    url: 'music/En-Jeevan.mp3',
  },

  {
    title: 'Kandangi Kandangi (Jilla) 🌸',
    artist: 'Imman — My Heart Captured',
    url: '/music/Kandangi-Kandangi.mp3',
  },
  {
    title: 'Marandhu Pochu(WithLove)🧸',
    artist: 'Sean Roldan — Fading Memories',
    url: '/music/Marandhu-Poche.mp3',
  },
  {
    title: 'Ammadi Un Azhagu (Vellakara Durai) 🌟',
    artist: 'Sathya Prakash',
    url: '/music/Ammadi-Un-Azhagu.mp3',
  },
]

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.5) // Default volume at 50%
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [soundFxEnabled, setSoundFxEnabled] = useState(false)

  const audioRef = useRef(null)
  const audioCtxRef = useRef(null) // For Web Audio API synthesized SFX
  const isInitializedRef = useRef(false)

  // Initialize background audio element
  useEffect(() => {
    const audio = new Audio()
    audio.loop = false // Manual advance or loop handled below
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    // When track ends, automatically go next or loop same if only 1
    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    // Load initial track URL
    audio.src = PLAYLIST[currentTrackIndex].url
    audio.volume = volume

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Auto-play workaround: Play on first touch/click in browser
  useEffect(() => {
    const startAutoplay = () => {
      if (isInitializedRef.current) return
      isInitializedRef.current = true

      // Attempt play. If it fails (due to other policies), it'll catch silently
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }

      // Initialize Web Audio context on user interaction
      initAudioCtx()

      // Clean up window listeners
      window.removeEventListener('click', startAutoplay)
      window.removeEventListener('touchstart', startAutoplay)
    }

    window.addEventListener('click', startAutoplay)
    window.addEventListener('touchstart', startAutoplay)

    return () => {
      window.removeEventListener('click', startAutoplay)
      window.removeEventListener('touchstart', startAutoplay)
    }
  }, [currentTrackIndex])

  // Synchronize volume with HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Initialize Web Audio API context for synth sounds
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  // Playback Control Actions
  const play = () => {
    initAudioCtx()
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Playback error:', err))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setProgress(0)
      setIsPlaying(false)
    }
  }

  const selectTrack = (index) => {
    if (index < 0 || index >= PLAYLIST.length) return
    setCurrentTrackIndex(index)
    setProgress(0)

    if (audioRef.current) {
      const wasPlaying = isPlaying || !isInitializedRef.current
      isInitializedRef.current = true // Already interacted
      audioRef.current.src = PLAYLIST[index].url
      audioRef.current.load()
      if (wasPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length
    selectTrack(nextIndex)
  }

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    selectTrack(prevIndex)
  }

  const seek = (timeInSeconds) => {
    if (audioRef.current && !isNaN(timeInSeconds)) {
      const clampedTime = Math.max(0, Math.min(timeInSeconds, duration))
      audioRef.current.currentTime = clampedTime
      setProgress(clampedTime)
    }
  }

  const toggleSoundFx = () => {
    setSoundFxEnabled(prev => !prev)
  }

  // =========================================================================
  // WEB AUDIO SYNTHESIZED SOUND EFFECTS
  // Synthesized procedurally to ensure 100% reliability, speed, and offline capability!
  // =========================================================================

  const getAudioContext = () => {
    initAudioCtx()
    return audioCtxRef.current
  }

  // 1. Gentle Click SFX (Standard click on buttons)
  const playClick = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05)

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  }, [soundFxEnabled])

  // 2. Card Flip SFX (Memory Game flip)
  const playFlip = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.08)

    gainNode.gain.setValueAtTime(0.04, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  }, [soundFxEnabled])

  // 3. Match Found SFX (Memory Game matched pair)
  const playMatch = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const t = ctx.currentTime
    const notes = [523.25, 783.99] // C5, G5

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t + idx * 0.08)

      gainNode.gain.setValueAtTime(0, t + idx * 0.08)
      gainNode.gain.linearRampToValueAtTime(0.06, t + idx * 0.08 + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.16)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start(t + idx * 0.08)
      osc.stop(t + idx * 0.08 + 0.16)
    })
  }, [soundFxEnabled])

  // 4. Game Win / Success SFX (Sparkling celebratory chime)
  const playSuccess = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const t = ctx.currentTime
    // C5, E5, G5, C6, E6, G6
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t + idx * 0.05)

      gainNode.gain.setValueAtTime(0, t + idx * 0.05)
      gainNode.gain.linearRampToValueAtTime(0.04, t + idx * 0.05 + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.25)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start(t + idx * 0.05)
      osc.stop(t + idx * 0.05 + 0.25)
    })
  }, [soundFxEnabled])

  // 5. Quiz Option Correct SFX (Upward major chord)
  const playCorrect = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const t = ctx.currentTime
    const freqs = [523.25, 659.25, 783.99] // C5, E5, G5

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t + idx * 0.04)

      gainNode.gain.setValueAtTime(0, t + idx * 0.04)
      gainNode.gain.linearRampToValueAtTime(0.05, t + idx * 0.04 + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.22)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start(t + idx * 0.04)
      osc.stop(t + idx * 0.04 + 0.22)
    })
  }, [soundFxEnabled])

  // 6. Quiz Option Wrong SFX (Buzz tone)
  const playWrong = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const t = ctx.currentTime

      // Play two short low buzzes
      ;[0, 0.12].forEach((delay) => {
        const osc = ctx.createOscillator()
        const gainNode = ctx.createGain()

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(110, t + delay)

        gainNode.gain.setValueAtTime(0, t + delay)
        gainNode.gain.linearRampToValueAtTime(0.03, t + delay + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.09)

        osc.connect(gainNode)
        gainNode.connect(ctx.destination)

        osc.start(t + delay)
        osc.stop(t + delay + 0.09)
      })
  }, [soundFxEnabled])

  // 7. Catch Heart SFX (Pop bubble)
  const playHeartCatch = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(750, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1900, ctx.currentTime + 0.04)

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  }, [soundFxEnabled])

  // 8. Epic Romantic Chime SFX (Grand climax harp/bell arpeggio when Preethi clicks YES!)
  const playYes = useCallback(() => {
    if (!soundFxEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const t = ctx.currentTime

    // Wide rich harmonic sweep spanning octaves:
    // C4, E4, G4, C5, E5, G5, C6, E6, G6, C7
    const freqs = [
      261.63, 329.63, 392.00,
      523.25, 659.25, 783.99,
      1046.50, 1318.51, 1567.98,
      2093.00
    ]

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const vibrato = ctx.createOscillator()
      const vibratoGain = ctx.createGain()
      const gainNode = ctx.createGain()

      // Set oscillator types: sine for sweet bell tones, triangle for body
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, t + idx * 0.06)

      // Add a shimmering vibrato effect for rich magical texture
      vibrato.frequency.value = 8 // 8Hz shimmer
      vibratoGain.gain.value = 5  // Modulation depth in Hz

      vibrato.connect(vibratoGain)
      vibratoGain.connect(osc.frequency)

      // Gain controls
      gainNode.gain.setValueAtTime(0, t + idx * 0.06)
      gainNode.gain.linearRampToValueAtTime(0.035, t + idx * 0.06 + 0.02)
      // Exponential decay out over 1.2 seconds for each note
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 1.2)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      vibrato.start(t + idx * 0.06)
      osc.start(t + idx * 0.06)

      vibrato.stop(t + idx * 0.06 + 1.25)
      osc.stop(t + idx * 0.06 + 1.25)
    })
  }, [soundFxEnabled])

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        volume,
        progress,
        duration,
        soundFxEnabled,
        playlist: PLAYLIST,
        play,
        pause,
        stop,
        selectTrack,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
        toggleSoundFx,

        // Synth SFX
        playClick,
        playFlip,
        playMatch,
        playSuccess,
        playCorrect,
        playWrong,
        playHeartCatch,
        playYes,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
