export interface Chore {
  id: string
  emoji: string
  label: string
  isCustom: boolean
}

export const DEFAULT_CHORES: Chore[] = [
  { id: 'mettre-table', emoji: '🍽️', label: 'Mettre la table', isCustom: false },
  { id: 'debarrasser-table', emoji: '🍽️', label: 'Débarrasser la table', isCustom: false },
  { id: 'courses', emoji: '🛒', label: 'Faire les courses', isCustom: false },
  { id: 'pain', emoji: '🥖', label: 'Aller chercher le pain', isCustom: false },
  { id: 'promener-raoul', emoji: '🦮', label: 'Promener Raoul', isCustom: false },
  { id: 'caca-raoul', emoji: '💩', label: 'Ramasser le caca de Raoul', isCustom: false },
  { id: 'promener-chien', emoji: '🐶', label: 'Promener le chien', isCustom: false },
  { id: 'aspirateur', emoji: '🧹', label: "Passer l'aspirateur", isCustom: false },
  { id: 'chiottes', emoji: '🚽', label: 'Laver les chiottes', isCustom: false },
]

const STORAGE_KEY = 'chore-roulette-custom-chores'

export function getCustomChores(): Chore[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as Chore[]
  } catch {
    return []
  }
}

export function saveCustomChores(chores: Chore[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chores))
}

export function addCustomChore(label: string, emoji: string = '✨'): Chore {
  const chores = getCustomChores()
  const newChore: Chore = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    emoji,
    label,
    isCustom: true,
  }
  chores.push(newChore)
  saveCustomChores(chores)
  return newChore
}

export function removeCustomChore(id: string): void {
  const chores = getCustomChores().filter(c => c.id !== id)
  saveCustomChores(chores)
}

export function getAllChores(): Chore[] {
  return [...getCustomChores(), ...DEFAULT_CHORES]
}
