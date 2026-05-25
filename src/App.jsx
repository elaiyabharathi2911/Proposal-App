import { useState, useMemo, useCallback } from 'react'
import { SCREEN_ORDER, collectAllImages } from './data/content'
import { useImageLoader } from './hooks/useImageLoader'
import { useAudio } from './context/AudioContext'
import LoadingScreen from './components/LoadingScreen'
import Sparkles from './components/Sparkles'
import FloatingEmojis from './components/FloatingEmojis'
import ClickHeartEmitter from './components/ClickHeartEmitter'
import ScreenLayout from './components/ScreenLayout'
import ScreenRouter from './screens/ScreenRouter'
import CelebrationScreen from './screens/CelebrationScreen'
import ProposalScreen from './screens/ProposalScreen'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

export default function App() {
  const { playClick } = useAudio()
  const imageUrls = useMemo(() => collectAllImages(), [])
  const { loaded, error } = useImageLoader(imageUrls)
  const [screenIndex, setScreenIndex] = useState(0)
  const [saidYes, setSaidYes] = useState(false)
  const [gameDone, setGameDone] = useState({})

  const screenId = SCREEN_ORDER[screenIndex]
  const isGame = screenId.startsWith('game-')
  const isWelcome = screenId === 'welcome'
  const isProposal = screenId === 'proposal'

  const goNext = useCallback(() => {
    playClick()
    setScreenIndex((i) => Math.min(i + 1, SCREEN_ORDER.length - 1))
  }, [playClick])

  const goBack = useCallback(() => {
    playClick()
    setScreenIndex((i) => Math.max(i - 1, 0))
  }, [playClick])

  const handleGameComplete = useCallback((id) => {
    setGameDone((g) => ({ ...g, [id]: true }))
  }, [])

  const handleYes = useCallback(() => {
    setSaidYes(true)
  }, [])

  if (!loaded) return <LoadingScreen error={error} />
  if (saidYes) {
    return (
      <div className="app app-fullscreen">
        <Sparkles />
        <ClickHeartEmitter />
        <CelebrationScreen />
      </div>
    )
  }

  const gameWon = !isGame || gameDone[screenId]
  const nextLabel = isWelcome
    ? 'Start Our Story ✨'
    : isProposal
      ? null
      : isGame && !gameWon
        ? 'Win the game to continue 💕'
        : screenId === 'letter'
          ? 'Proposal Letter →'
          : screenId.startsWith('letter-')
            ? 'Next Letter →'
            : screenIndex === SCREEN_ORDER.length - 1
              ? null
              : 'Next Screen →'

  return (
    <div className="app app-fullscreen">
      <Sparkles />
      <FloatingEmojis active={screenIndex > 0} />
      <ClickHeartEmitter />
      <MusicPlayer />

      <ScreenLayout
        screenId={screenId}
        screenIndex={screenIndex}
        onNext={goNext}
        onBack={goBack}
        nextLabel={nextLabel || 'Next Screen →'}
        nextDisabled={isGame && !gameWon}
        hideNext={isProposal}
        hideBack={isWelcome}
      >
        {isProposal ? (
          <ProposalScreen onYes={handleYes} />
        ) : (
          <ScreenRouter
            screenId={screenId}
            onGameComplete={handleGameComplete}
          />
        )}
      </ScreenLayout>
    </div>
  )
}
