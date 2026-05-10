import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} —{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              RABENANTENAINA Clévin
            </span>
            . Tous droits réservés.
          </p>
          
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
           Dernière mise à jour le  <span className='font-semibold text-gray-950 dark:text-gray-100'>10 Mai 2026</span>
          </p>
        </div>
      </div>
    </footer>
  )
}