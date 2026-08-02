import { useState } from 'react'
import { Chore } from '../data/chores'
import { Participant } from '../data/participants'
import ChoreCard from './ChoreCard'
import AddChoreForm from './AddChoreForm'
import ParticipantList from './ParticipantList'

interface HomeScreenProps {
  chores: Chore[]
  participants: Participant[]
  onSelectChore: (chore: Chore) => void
  onToggleParticipant: (id: string) => void
  onAddChore: (label: string, emoji: string) => void
  onRemoveChore: (id: string) => void
  enabledCount: number
}

export default function HomeScreen({
  chores,
  participants,
  onSelectChore,
  onToggleParticipant,
  onAddChore,
  onRemoveChore,
  enabledCount,
}: HomeScreenProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id)
  }

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      onRemoveChore(confirmDeleteId)
      setConfirmDeleteId(null)
    }
  }

  const handleCancelDelete = () => {
    setConfirmDeleteId(null)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 animate-fade-in">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          🎡 Roulette des Tâches
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Qui va s'y coller aujourd'hui ?
        </p>
      </header>

      {/* Chores Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          🧹 Tâches ménagères
        </h2>
        {enabledCount === 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3 text-sm text-orange-700">
            ⚠️ Sélectionne au moins un participant pour lancer la roulette !
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chores.map(chore => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onSelect={onSelectChore}
              onDelete={handleDeleteClick}
              disabled={enabledCount === 0}
            />
          ))}
        </div>
      </section>

      {/* Add Custom Chore */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          ➕ Ajouter une tâche
        </h2>
        <AddChoreForm onAdd={onAddChore} />
      </section>

      {/* Participants Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          👨‍👩‍👧‍👦 Participants
          <span className="text-sm font-normal text-gray-400">
            ({enabledCount}/{participants.length})
          </span>
        </h2>
        <ParticipantList
          participants={participants}
          onToggle={onToggleParticipant}
        />
      </section>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full card-shadow text-center">
            <p className="text-xl mb-2">🗑️</p>
            <p className="text-gray-800 font-semibold mb-1">Supprimer cette tâche ?</p>
            <p className="text-gray-500 text-sm mb-5">
              Cette action est définitive.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
