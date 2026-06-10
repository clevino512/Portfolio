import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollToTopProps {
  scrollToTop?: () => void;
}

export default function ScrollToTop({ scrollToTop }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setIsVisible(scrollTop > 300)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (scrollToTop) {
      scrollToTop()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleClick}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 44 44"
          >
            <circle
              cx="22" cy="22" r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="22" cy="22" r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 19}`}
              strokeDashoffset={`${2 * Math.PI * 19 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              className="text-primary-500 transition-all duration-150"
            />
          </svg>
          {/* Button */}
          <div className="relative w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all duration-300">
            <ArrowUp size={17} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
