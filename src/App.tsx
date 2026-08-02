import { useState, useCallback } from 'react'
import { Chore, getAllChores, addCustomChore, removeCustomChore } from './data/chores'
import { Participant, DEFAULT_PARTICIPANTS } from './data/participants'
import HomeScreen from './components/HomeScreen'
import SpinScreen from './components/SpinScreen'
import ResultScreen from './components/ResultScreen'

type Screen = 'home' | 'spin' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [chores, setChores] = useState<Chore[]>(getAllChores())
  const [participants, setParticipants] = useState<Participant[]>(DEFAULT_PARTICIPANTS)
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null)
  const [winner, setWinner] = useState<Participant | null>(null)

  const enabledParticipants = participants.filter(p => p.enabled)

  const handleSelectChore = useCallback((chore: Chore) => {
    setSelectedChore(chore)
    setScreen('spin')
  }, [])

  const handleSpinComplete = useCallback((selected: Participant) => {
    setWinner(selected)
    setScreen('result')
  }, [])

  const handleRetry = useCallback(() => {
    setWinner(null)
    setScreen('spin')
  }, [])

  const handleBackHome = useCallback(() => {
    setSelectedChore(null)
    setWinner(null)
    setScreen('home')
  }, [])

  const handleToggleParticipant = useCallback((id: string) => {
    setParticipants(prev =>
      prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    )
  }, [])

  const handleAddChore = useCallback((label: string, emoji: string) => {
    addCustomChore(label, emoji)
    setChores(getAllChores())
  }, [])

  const handleRemoveChore = useCallback((id: string) => {
    removeCustomChore(id)
    setChores(getAllChores())
  }, [])

  return (
    <div className="min-h-screen pb-8">
      {screen === 'home' && (
        <HomeScreen
          chores={chores}
          participants={participants}
          onSelectChore={handleSelectChore}
          onToggleParticipant={handleToggleParticipant}
          onAddChore={handleAddChore}
          onRemoveChore={handleRemoveChore}
          enabledCount={enabledParticipants.length}
        />
      )}
      {screen === 'spin' && selectedChore && (
        <SpinScreen
          chore={selectedChore}
          participants={enabledParticipants}
          onSpinComplete={handleSpinComplete}
          onBack={handleBackHome}
        />
      )}
      {screen === 'result' && selectedChore && winner && (
        <ResultScreen
          chore={selectedChore}
          winner={winner}
          onRetry={handleRetry}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  )
}

export default App
