
import { FaArrowUp } from 'react-icons/fa'
interface FooterNavsProps {
  scrollToTop: () => void;
}

export default function FooterNavs({ scrollToTop }: FooterNavsProps) {
  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-50 bg-gray-100 text-black p-3 rounded-full  hover:bg-gray-200 
      cursor-pointer shadow-md transition-colors duration-300"
    >
      <FaArrowUp className="w-5 h-5 hover:scale-150 transition-transform duration-500" />
    </button>
  )
}
 
