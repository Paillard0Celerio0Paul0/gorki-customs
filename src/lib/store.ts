import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Game {
  id: string
  name: string
  date: Date
  blueTeam: Team
  redTeam: Team
  blueScore: number
  redScore: number
  winner: 'BLUE' | 'RED'
  duration?: number
}

interface Team {
  id: string
  name: string
  side: 'BLUE' | 'RED'
  players: Player[]
}

interface Player {
  id: string
  pseudo: string
  role: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT'
  champion: string
  kills: number
  deaths: number
  assists: number
  cs: number
  gold: number
  damage: number
}

interface Clip {
  id: string
  title: string
  blobUrl: string
  gameId: string
  uploaderId?: string
  createdAt: Date
}

interface AppState {
  games: Game[]
  clips: Clip[]
  selectedGame: Game | null
  selectedClip: Clip | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setGames: (games: Game[]) => void
  setClips: (clips: Clip[]) => void
  setSelectedGame: (game: Game | null) => void
  setSelectedClip: (clip: Clip | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addGame: (game: Game) => void
  updateGame: (game: Game) => void
  deleteGame: (id: string) => void
  addClip: (clip: Clip) => void
  deleteClip: (id: string) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      games: [],
      clips: [],
      selectedGame: null,
      selectedClip: null,
      isLoading: false,
      error: null,

      setGames: (games) => set({ games }),
      setClips: (clips) => set({ clips }),
      setSelectedGame: (game) => set({ selectedGame: game }),
      setSelectedClip: (clip) => set({ selectedClip: clip }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      addGame: (game) => set((state) => ({ games: [...state.games, game] })),
      updateGame: (game) => set((state) => ({
        games: state.games.map(g => g.id === game.id ? game : g)
      })),
      deleteGame: (id) => set((state) => ({
        games: state.games.filter(g => g.id !== id)
      })),

      addClip: (clip) => set((state) => ({ clips: [...state.clips, clip] })),
      deleteClip: (id) => set((state) => ({
        clips: state.clips.filter(c => c.id !== id)
      })),
    }),
    {
      name: 'gorki-custom-store',
    }
  )
)
