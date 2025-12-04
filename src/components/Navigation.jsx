import { useState, useEffect } from 'react'
import VoiceAgent from './VoiceAgent'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    'Warehouse Cleaning',
    'Industrial Power Washing',
    'Floor Buffing & Stripping',
    'Wall Deep-Cleans',
    'Post-Construction Cleanup',
    'Emergency Cleaning',
    'Scheduled Maintenance',
  ]

  const areas = [
    'Cumberland County',
    'Dauphin County',
    'Perry County',
    'York County',
    'Adams County',
    'Lancaster County',
    'Franklin County',
    'Lebanon County',
    'Juniata County',
    'Mifflin County',
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }

  const toggleMobileDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-4'
          : 'bg-white/95 py-6'
      }`}
    >
      <div className="container-narrow px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-0 group"
          >
            <svg
              className="w-11 h-11 transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 36 48"
              fill="none"
            >
              {/* Three concentric C's - all centered at (24,24), same 60° opening, equal 6-unit gaps */}
              {/* Outer C - radius 20 */}
              <path
                d="M34 6.72 A20 20 0 1 0 34 41.28"
                stroke="#001F3F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Middle C - radius 14 */}
              <path
                d="M31 11.87 A14 14 0 1 0 31 36.13"
                stroke="#001F3F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Inner C - radius 8 */}
              <path
                d="M28 17.07 A8 8 0 1 0 28 30.93"
                stroke="#001F3F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Precise 5-point star - R=3.5, r=1.4, centered at (24,24) */}
              <path
                d="M24 20.5 L24.82 22.87 L27.33 22.92 L25.33 24.43 L26.06 26.83 L24 25.4 L21.94 26.83 L22.67 24.43 L20.67 22.92 L23.18 22.87 Z"
                fill="#001F3F"
              />
            </svg>
            <span className="hidden sm:block text-navy font-bold text-lg tracking-tight">
              Chino Cleaning Crew
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10 lg:gap-14">
            {/* Home */}
            <li>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="nav-link"
              >
                Home
              </a>
            </li>

            {/* Services Dropdown */}
            <li className="relative group">
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className="nav-link flex items-center gap-1"
              >
                Services
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              {/* Dropdown */}
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-xl border border-steel-gray/10 min-w-64 py-3">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="block px-6 py-3 text-navy font-medium hover:bg-steel-gray/10 transition-colors duration-150 cursor-default"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </li>

            {/* Areas Dropdown */}
            <li className="relative group">
              <a
                href="#areas"
                onClick={(e) => handleNavClick(e, '#areas')}
                className="nav-link flex items-center gap-1"
              >
                Areas We Serve
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              {/* Dropdown */}
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-xl border border-steel-gray/10 min-w-56 py-3">
                  {areas.map((area, index) => (
                    <span
                      key={index}
                      className="block px-6 py-3 text-navy font-medium hover:bg-steel-gray/10 transition-colors duration-150 cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </li>

            {/* Contact */}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="nav-link"
              >
                Contact
              </a>
            </li>

            {/* Voice Agent CTA */}
            <li>
              <VoiceAgent inNavbar={true} />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[600px] mt-6' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-2 py-4 border-t border-steel-gray/20">
            {/* Home */}
            <li>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="nav-link block py-2"
              >
                Home
              </a>
            </li>

            {/* Services with Accordion */}
            <li>
              <button
                onClick={() => toggleMobileDropdown('services')}
                className="nav-link flex items-center justify-between w-full py-2"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openDropdown === 'services' ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="pl-4 py-2 space-y-2">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="block py-2 text-steel-gray font-medium cursor-default"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </li>

            {/* Areas with Accordion */}
            <li>
              <button
                onClick={() => toggleMobileDropdown('areas')}
                className="nav-link flex items-center justify-between w-full py-2"
              >
                Areas We Serve
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'areas' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openDropdown === 'areas' ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="pl-4 py-2 space-y-2">
                  {areas.map((area, index) => (
                    <span
                      key={index}
                      className="block py-2 text-steel-gray font-medium cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </li>

            {/* Contact */}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="nav-link block py-2"
              >
                Contact
              </a>
            </li>

            {/* Voice Agent CTA */}
            <li className="pt-4">
              <VoiceAgent inNavbar={true} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
