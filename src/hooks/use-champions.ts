import { useState, useEffect } from 'react'

interface Champion {
  id: string
  name: string
  key: string
}

export function useChampions() {
  const [champions, setChampions] = useState<Champion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        // Récupérer la liste des champions depuis l'API de Riot
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json')
        if (response.ok) {
          const data = await response.json()
          const championsList = Object.values(data.data).map((champion: any) => ({
            id: champion.id,
            name: champion.name,
            key: champion.key
          }))
          setChampions(championsList)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des champions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChampions()
  }, [])

  const getChampionIconUrl = (championName: string) => {
    const cleanName = championName
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
    return `https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${cleanName}.png`
  }

  const findChampionByName = (name: string) => {
    return champions.find(champion => 
      champion.name.toLowerCase() === name.toLowerCase() ||
      champion.id.toLowerCase() === name.toLowerCase()
    )
  }

  return {
    champions,
    loading,
    getChampionIconUrl,
    findChampionByName
  }
}
