export interface Participant {
  id: string
  name: string
  enabled: boolean
}

export const DEFAULT_PARTICIPANTS: Participant[] = [
  { id: 'anne-catherine', name: 'Anne-Catherine', enabled: true },
  { id: 'jean-marc', name: 'Jean-Marc', enabled: true },
  { id: 'margot', name: 'Margot', enabled: true },
  { id: 'guillaume', name: 'Guillaume', enabled: true },
  { id: 'vincent', name: 'Vincent', enabled: true },
  { id: 'pb', name: 'PB', enabled: true },
  { id: 'arthur', name: 'Arthur', enabled: true },
  { id: 'bastian', name: 'Bastian', enabled: true },
]
