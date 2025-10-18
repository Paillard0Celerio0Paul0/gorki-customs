import Link from 'next/link'

interface BuyMeCoffeeSimpleProps {
  slug: string
  text?: string
  className?: string
}

export function BuyMeCoffeeSimple({ 
  slug, 
  text = 'Buy me a coffee',
  className = ''
}: BuyMeCoffeeSimpleProps) {
  return (
    <Link
      href={`https://www.buymeacoffee.com/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
    >
      <span className="mr-2">☕</span>
      {text}
    </Link>
  )
}
