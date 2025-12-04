import { useEffect, useState } from 'react'

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    warehouseSize: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', phone: '', warehouseSize: '' })
    }, 3000)
  }

  const services = [
    'Warehouse Cleaning',
    'Industrial Power Washing',
    'Floor Buffing & Stripping',
    'Wall Deep-Cleans',
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
          alt="Industrial warehouse floor cleaning with professional equipment"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with opacity (no gradient) */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pt-32 md:pt-40">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              {/* Headline */}
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 transition-all duration-700 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="text-white">Chino Cleaning Crew:</span>
                <br />
                <span className="text-white">Industrial Cleaning Experts</span>
              </h1>

              {/* Subheadline */}
              <p
                className={`text-xl md:text-2xl text-white/90 font-medium mb-10 transition-all duration-700 delay-100 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                From warehouses to offices, factories to storefronts—if it needs cleaning, we handle it. Industrial-grade results for any space.
              </p>

              {/* Services List */}
              <ul
                className={`space-y-3 transition-all duration-700 delay-200 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {services.map((service, index) => (
                  <li
                    key={index}
                    className="text-white/95 text-lg md:text-xl font-semibold flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-white" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Contact Form */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-black text-navy mb-2">
                  Get Your Free Quote
                </h2>
                <p className="text-steel-gray mb-6">
                  We'll respond within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-navy mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      Request Received!
                    </h3>
                    <p className="text-steel-gray">
                      We'll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="hero-name"
                        className="block text-navy font-bold mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="hero-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="hero-phone"
                        className="block text-navy font-bold mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="hero-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 555-5555"
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="hero-warehouseSize"
                        className="block text-navy font-bold mb-2"
                      >
                        Space Size
                      </label>
                      <input
                        type="text"
                        id="hero-warehouseSize"
                        name="warehouseSize"
                        value={formData.warehouseSize}
                        onChange={handleChange}
                        placeholder="e.g., 50,000 sq ft or describe your space"
                        required
                        className="input-field"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full text-lg"
                    >
                      Get Free Quote
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default Hero
