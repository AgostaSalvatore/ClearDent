import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Il Team', href: '#team' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Contatti', href: '#contatti' },
]

function ThemeToggle({ scrolled }) {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Cambia tema"
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
        scrolled
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      {dark ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dashboardPath = user?.role === 'patient' ? '/dashboard' : '/admin'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2C10 2 6 6.5 6 11c0 3 1 5 2 7l2 10c0 1 1 2 2 2h8c1 0 2-1 2-2l2-10c1-2 2-4 2-7 0-4.5-4-9-10-9z"
              fill={scrolled ? '#00A9A5' : 'white'} />
          </svg>
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
            scrolled ? 'text-navy-600 dark:text-white' : 'text-white'
          }`}>
            Clear<span className="text-teal-500">Dent</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`font-medium text-sm transition-colors hover:text-teal-500 ${
                scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white/90'
              }`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA / Auth + toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle scrolled={scrolled} />
          {user ? (
            <>
              <Link to={dashboardPath}
                className={`font-medium text-sm transition-colors hover:text-teal-500 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white/90'
                }`}>
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={logout}
                className={`font-semibold text-sm px-5 py-2.5 rounded-full transition-all border ${
                  scrolled
                    ? 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-300 hover:text-red-500'
                    : 'border-white/40 text-white hover:border-red-300 hover:text-red-300'
                }`}>
                Esci
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className={`font-medium text-sm transition-colors hover:text-teal-500 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white/90'
                }`}>
                Accedi
              </Link>
              <a href="#contatti"
                className={`font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-md'
                    : 'bg-white text-navy-600 hover:bg-teal-500 hover:text-white'
                }`}>
                Prenota Visita
              </a>
            </>
          )}
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle scrolled={scrolled} />
          <button className="p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`block w-6 h-0.5 transition-all ${
                  scrolled ? 'bg-navy-600 dark:bg-gray-200' : 'bg-white'
                }`} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/50 border-t border-gray-100 dark:border-gray-700 px-6 py-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 dark:text-gray-200 font-medium hover:text-teal-500 transition-colors">
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <Link to={dashboardPath} onClick={() => setMenuOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-200 font-medium hover:text-teal-500">
                Dashboard
              </Link>
              <button onClick={() => { logout(); setMenuOpen(false) }}
                className="mt-3 w-full text-left py-2 text-red-500 font-medium">
                Esci
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-200 font-medium hover:text-teal-500">
                Accedi
              </Link>
              <a href="#contatti" onClick={() => setMenuOpen(false)}
                className="mt-3 btn-primary text-center block">
                Prenota Visita
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
