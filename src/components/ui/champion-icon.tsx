import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ChampionIconProps {
  championName: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showTooltip?: boolean
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export function ChampionIcon({ 
  championName, 
  size = 'md', 
  className,
  showTooltip = false 
}: ChampionIconProps) {
  const [imageError, setImageError] = useState(false)
  
  // Nettoyer le nom du champion pour l'URL
  const cleanChampionName = championName
    .replace(/\s+/g, '') // Supprimer les espaces
    .replace(/[^a-zA-Z0-9]/g, '') // Garder seulement lettres et chiffres
  
  // Gérer les cas spéciaux de noms de champions
  const championMapping: { [key: string]: string } = {
    'Wukong': 'MonkeyKing',
    'ChoGath': 'Chogath',
    'KhaZix': 'Khazix',
    'VelKoz': 'Velkoz',
    'KogMaw': 'KogMaw',
    'LeBlanc': 'Leblanc',
    'Fiddlesticks': 'FiddleSticks',
    'DrMundo': 'DrMundo',
    'JarvanIV': 'JarvanIV',
    'MasterYi': 'MasterYi',
    'MissFortune': 'MissFortune',
    'TahmKench': 'TahmKench',
    'TwistedFate': 'TwistedFate',
    'XinZhao': 'XinZhao'
  }
  
  const finalChampionName = championMapping[cleanChampionName] || cleanChampionName
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${finalChampionName}.png`
  
  if (imageError) {
    // Fallback si l'image ne charge pas
    return (
      <div 
        className={cn(
          'rounded-full bg-muted flex items-center justify-center text-xs font-bold',
          sizeClasses[size],
          className
        )}
        title={showTooltip ? championName : undefined}
      >
        {championName.charAt(0).toUpperCase()}
      </div>
    )
  }
  
  return (
    <img
      src={imageUrl}
      alt={championName}
      className={cn(
        'rounded-full object-cover border border-border',
        sizeClasses[size],
        className
      )}
      onError={() => setImageError(true)}
      title={showTooltip ? championName : undefined}
    />
  )
}
