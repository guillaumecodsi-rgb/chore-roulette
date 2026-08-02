import { useState, useRef, useEffect, useCallback } from 'react'
import { Chore } from '../data/chores'
import { Participant } from '../data/participants'

interface SpinScreenProps {
  chore: Chore
  participants: Participant[]
  onSpinComplete: (winner: Participant) => void
  onBack: () => void
}

const WHEEL_COLORS = [
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6',
  '#6366f1', '#84cc16',
]

export default function SpinScreen({ chore, participants, onSpinComplete, onBack }: SpinScreenProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spinTimeoutRef = useRef<number | null>(null)

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = canvas.width
    const center = size / 2
    const radius = center - 10
    const sliceAngle = (2 * Math.PI) / participants.length

    ctx.clearRect(0, 0, size, size)

    participants.forEach((p, i) => {
      const startAngle = i * sliceAngle
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length]
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(center, center)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'white'
      ctx.font = `bold ${Math.min(16, 200 / participants.length)}px Inter, sans-serif`
      ctx.shadowColor = 'rgba(0,0,0,0.3)'
      ctx.shadowBlur = 2
      ctx.fillText(p.name, radius - 20, 5)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(center, center, 20, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [participants])

  useEffect(() => {
    drawWheel()
  }, [drawWheel])

  const spin = () => {
    if (spinning || participants.length === 0) return

    setSpinning(true)

    // Pick a random winner
    const winnerIndex = Math.floor(Math.random() * participants.length)
    const sliceAngle = 360 / participants.length

    // Calculate final rotation: multiple full spins + landing in the middle of winner slice
    // The pointer is at the top (270 degrees in standard canvas coords)
    const targetAngle = 360 - (winnerIndex * sliceAngle + sliceAngle / 2)
    const totalRotation = rotation + 360 * 8 + targetAngle

    setRotation(totalRotation)

    // Wait for animation to complete
    spinTimeoutRef.current = window.setTimeout(() => {
      setSpinning(false)
      onSpinComplete(participants[winnerIndex])
    }, 4200)
  }

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 text-center animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 text-sm mb-3 inline-block transition-colors"
        >
          ← Retour
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {chore.emoji} {chore.label}
        </h2>
        <p className="text-gray-500 text-sm mt-1">Qui va s'en charger ?</p>
      </div>

      {/* Wheel */}
      <div className="relative inline-block mb-6">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 text-3xl drop-shadow-md">
          🔻
        </div>

        {/* Canvas wheel with rotation */}
        <div
          className="wheel-container"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            className="w-72 h-72 md:w-80 md:h-80 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className={`
          w-full max-w-xs mx-auto py-4 px-8 rounded-2xl text-lg font-bold transition-all duration-200
          ${spinning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {spinning ? '🎡 Ça tourne...' : '🎡 Lancer la roulette'}
      </button>
    </div>
  )
}
