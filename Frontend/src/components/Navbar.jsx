import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">F</div>
              <span className="font-semibold text-lg">Farmers Friend</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/" className={({isActive}) => (isActive ? 'underline font-medium' : 'hover:underline')}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => (isActive ? 'underline font-medium' : 'hover:underline')}>About Us</NavLink>
            <NavLink to="/predict" className={({isActive}) => (isActive ? 'bg-white text-green-700 px-3 py-1 rounded-md font-semibold' : 'bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md')}>Predict</NavLink>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-green-600/95 px-4 pt-2 pb-4">
          <NavLink to="/" onClick={() => setOpen(false)} className={({isActive}) => (isActive ? 'block py-2 font-medium underline' : 'block py-2')}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={({isActive}) => (isActive ? 'block py-2 font-medium underline' : 'block py-2')}>About Us</NavLink>
          <NavLink to="/predict" onClick={() => setOpen(false)} className={({isActive}) => (isActive ? 'block py-2 font-medium' : 'block py-2')}>Predict</NavLink>
        </div>
      )}
    </nav>
  )
}
