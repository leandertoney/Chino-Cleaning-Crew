function Footer() {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#areas', label: 'Areas We Serve' },
    { href: '#contact', label: 'Contact' },
  ]

  const counties = [
    'Cumberland',
    'Dauphin',
    'Perry',
    'York',
    'Adams',
    'Lancaster',
    'Franklin',
    'Lebanon',
    'Juniata',
    'Mifflin',
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-steel-gray py-16 px-6 md:px-12 lg:px-20">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0 mb-6">
              <svg
                className="w-14 h-14"
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
              <span className="text-navy font-bold text-xl tracking-tight">
                Chino Cleaning Crew
              </span>
            </div>
            <p className="text-navy/80 leading-relaxed mb-6">
              Your trusted cleaning professionals across Central Pennsylvania. Industrial warehouses, commercial spaces, specialty projects—if it's dirty, we handle it.
            </p>
            <a
              href="tel:717-714-0662"
              className="text-navy font-bold text-xl hover:text-charcoal transition-colors duration-200"
            >
              717-714-0662
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-navy font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-navy/80 hover:text-navy font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-navy font-bold text-lg mb-6">Counties Served</h4>
            <div className="grid grid-cols-2 gap-2">
              {counties.map((county, index) => (
                <span key={index} className="text-navy/80 text-sm">
                  {county}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-navy/60 text-sm">
              © {new Date().getFullYear()} Chino Cleaning Crew. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-navy/60 hover:text-navy text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-navy/60 hover:text-navy text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
