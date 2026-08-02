import { Chore } from '../data/chores'

interface ChoreCardProps {
  chore: Chore
  onSelect: (chore: Chore) => void
  onDelete: (id: string) => void
  disabled: boolean
}

export default function ChoreCard({ chore, onSelect, onDelete, disabled }: ChoreCardProps) {
  return (
    <div className="relative group">
      <button
        onClick={() => !disabled && onSelect(chore)}
        disabled={disabled}
        className={`
          w-full flex items-center gap-3 p-4 rounded-2xl bg-white card-shadow
          transition-all duration-200 text-left
          ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:card-shadow-hover hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
          }
        `}
      >
        <span className="text-2xl">{chore.emoji}</span>
        <span className="font-medium text-gray-700 text-sm md:text-base">
          {chore.label}
        </span>
        {chore.isCustom && (
          <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
            perso
          </span>
        )}
      </button>

      {/* Delete button for custom chores */}
      {chore.isCustom && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(chore.id)
          }}
          className="
            absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white
            flex items-center justify-center text-xs font-bold
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            hover:bg-red-600 active:scale-90
            shadow-md
          "
          title="Supprimer cette tâche"
        >
          ✕
        </button>
      )}
    </div>
  )
}
