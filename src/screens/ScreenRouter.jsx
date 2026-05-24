import WelcomeScreen from './WelcomeScreen'
import IntroScreen from './IntroScreen'
import MomentScreen from './MomentScreen'
import SecretScreen from './SecretScreen'
import ReasonsScreen from './ReasonsScreen'
import QuotesScreen from './QuotesScreen'
import GalleryScreen from './GalleryScreen'
import LetterScreen from './LetterScreen'
import ProposalScreen from './ProposalScreen'
import CatchHeartsGame from '../games/CatchHeartsGame'
import MemoryMatchGame from '../games/MemoryMatchGame'
import LoveQuizGame from '../games/LoveQuizGame'
import { getLetterByScreenId, welcome, storyIntro, collegeMoments, secretLove, reasons } from '../data/content'

export default function ScreenRouter({ screenId, onGameComplete }) {
  if (screenId.startsWith('letter') || screenId === 'proposal-letter') {
    const letter = getLetterByScreenId(screenId)
    return <LetterScreen data={letter} />
  }

  switch (screenId) {
    case 'welcome':
      return <WelcomeScreen data={welcome} />
    case 'intro':
      return <IntroScreen data={storyIntro} />
    case 'class':
      return <MomentScreen data={collegeMoments[0]} />
    case 'lab':
      return <MomentScreen data={collegeMoments[1]} />
    case 'lunch':
      return <MomentScreen data={collegeMoments[2]} />
    case 'interval':
      return <MomentScreen data={collegeMoments[3]} />
    case 'secret':
      return <SecretScreen data={secretLove} />
    case 'reasons':
      return <ReasonsScreen data={reasons} />
    case 'quotes':
      return <QuotesScreen />
    case 'game-hearts':
      return <CatchHeartsGame onComplete={onGameComplete} />
    case 'game-memory':
      return <MemoryMatchGame onComplete={onGameComplete} />
    case 'game-quiz':
      return <LoveQuizGame onComplete={onGameComplete} />
    case 'gallery':
      return <GalleryScreen />
    case 'proposal':
      return <ProposalScreen />
    default:
      return null
  }
}
