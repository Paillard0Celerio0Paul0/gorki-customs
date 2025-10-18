'use client'

import { useEffect, useRef } from 'react'

interface BuyMeCoffeeProps {
  slug: string
  color?: string
  emoji?: string
  font?: string
  text?: string
  outlineColor?: string
  fontColor?: string
  coffeeColor?: string
}

export function BuyMeCoffee({
  slug,
  color = '#5F7FFF',
  emoji = '',
  font = 'Cookie',
  text = 'Buy me a coffee',
  outlineColor = '#000000',
  fontColor = '#ffffff',
  coffeeColor = '#FFDD00'
}: BuyMeCoffeeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Vérifier si le bouton est déjà créé
    if (containerRef.current.querySelector('.bmc-btn')) {
      return
    }

    // Créer le bouton manuellement
    const button = document.createElement('a')
    button.href = `https://www.buymeacoffee.com/${slug}`
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
    button.className = 'bmc-btn'
    button.style.cssText = `
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      background-color: ${color};
      color: ${fontColor};
      text-decoration: none;
      border-radius: 6px;
      font-family: ${font}, cursive;
      font-size: 14px;
      font-weight: 500;
      border: 2px solid ${outlineColor};
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `

    // Ajouter l'emoji café si spécifié
    if (emoji) {
      const emojiSpan = document.createElement('span')
      emojiSpan.textContent = emoji
      emojiSpan.style.marginRight = '8px'
      button.appendChild(emojiSpan)
    } else {
      // Ajouter l'icône café par défaut
      const coffeeIcon = document.createElement('span')
      coffeeIcon.innerHTML = '☕'
      coffeeIcon.style.marginRight = '8px'
      coffeeIcon.style.color = coffeeColor
      button.appendChild(coffeeIcon)
    }

    // Ajouter le texte
    const textSpan = document.createElement('span')
    textSpan.textContent = text
    button.appendChild(textSpan)

    // Ajouter les effets hover
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)'
      button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
      button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
    })

    // Ajouter le bouton au container
    containerRef.current.appendChild(button)

    // Cleanup function
    return () => {
      if (containerRef.current) {
        const existingButton = containerRef.current.querySelector('.bmc-btn')
        if (existingButton) {
          existingButton.remove()
        }
      }
    }
  }, [slug, color, emoji, font, text, outlineColor, fontColor, coffeeColor])

  return <div ref={containerRef} />
}
