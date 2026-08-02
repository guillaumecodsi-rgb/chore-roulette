import { useState } from 'react'

interface AddChoreFormProps {
  onAdd: (label: string, emoji: string) => void
}

const EMOJI_OPTIONS = ['✨', '🧽', '🪣', '🧺', '🍳', '🪴', '🛁', '🚗', '📦', '🐾']

export default function AddChoreForm({ onAdd }: AddChoreFormProps) {
  const [label, setLabel] = useState('')
  const [emoji, setEmoji] = useState('✨')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd(trimmed, emoji)
    setLabel('')
    setEmoji('✨')
    setShowEmojiPicker(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 card-shadow">
      <div className="flex gap-2 items-center">
        {/* Emoji selector */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200 transition-colors shrink-0"
          title="Choisir un emoji"
        >
          {emoji}
        </button>

        {/* Text input */}
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nom de la tâche..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
          maxLength={50}
        />

        {/* Add button */}
        <button
          type="submit"
          disabled={!label.trim()}
          className={`
            px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all
            ${label.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Ajouter
        </button>
      </div>

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="mt-3 flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map(e => (
            <button
              key={e}
              type="button"
              onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center text-lg
                transition-all hover:scale-110
                ${emoji === e ? 'bg-orange-100 ring-2 ring-orange-400' : 'bg-gray-50 hover:bg-gray-100'}
              `}
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
