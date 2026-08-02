import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Chore } from '../data/chores'
import { Participant } from '../data/participants'

interface ResultScreenProps {
  chore: Chore
  winner: Participant
  onRetry: () => void
  onBackHome: () => void
}

export default function ResultScreen({ chore, winner, onRetry, onBackHome }: ResultScreenProps) {
  useEffect(() => {
    // Fire confetti!
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f97316', '#eab308', '#22c55e', '#8b5cf6', '#ec4899'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f97316', '#eab308', '#22c55e', '#8b5cf6', '#ec4899'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Big initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#eab308', '#22c55e', '#8b5cf6', '#ec4899'],
    })

    frame()
  }, [])

  return (
    <div className="max-w-lg mx-auto px-4 pt-16 text-center animate-fade-in">
      {/* Winner announcement */}
      <div className="mb-8">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          C'est {winner.name} !
        </h2>
        <p className="text-lg text-gray-600">
          <span className="font-semibold">{winner.name}</span> doit{' '}
          <span className="lowercase font-semibold text-orange-600">
            {chore.emoji} {chore.label.toLowerCase()}
          </span>
        </p>
      </div>

      {/* Fun message */}
      <div className="bg-white rounded-2xl p-6 card-shadow mb-8 inline-block">
        <p className="text-5xl mb-2">{chore.emoji}</p>
        <p className="text-gray-500 text-sm italic">Bon courage ! 💪</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <button
          onClick={onRetry}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-white border-2 border-orange-200 text-orange-600 font-semibold hover:bg-orange-50 hover:border-orange-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          🔄 Refaire un tirage
        </button>
        <button
          onClick={onBackHome}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          ✅ Autre tâche
        </button>
      </div>
    </div>
  )
}
