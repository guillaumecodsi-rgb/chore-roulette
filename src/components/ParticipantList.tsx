import { Participant } from '../data/participants'

interface ParticipantListProps {
  participants: Participant[]
  onToggle: (id: string) => void
}

export default function ParticipantList({ participants, onToggle }: ParticipantListProps) {
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {participants.map(p => (
          <label
            key={p.id}
            className={`
              flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200
              ${p.enabled
                ? 'bg-green-50 border border-green-200'
                : 'bg-gray-50 border border-gray-100 opacity-60'
              }
              hover:scale-[1.02] active:scale-[0.98]
            `}
          >
            <input
              type="checkbox"
              checked={p.enabled}
              onChange={() => onToggle(p.id)}
              className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-400 accent-green-500"
            />
            <span className={`text-sm font-medium ${p.enabled ? 'text-gray-700' : 'text-gray-400'}`}>
              {p.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
