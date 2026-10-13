import { Link } from 'react-router'
import BrandMark from './BrandMark'

export default function Logo() {
  return (
    <Link to="/" aria-label="Yasser Salem home" className="inline-flex shrink-0 items-center rounded-full transition-transform duration-200 hover:scale-105 motion-reduce:transform-none">
      <BrandMark compact />
    </Link>
  )
}
