import { useState } from 'react'
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    warehouseSize: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { ref, isVisible } = useFadeInOnScroll()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Smooth scroll to top (fake success)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)

    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', phone: '', warehouseSize: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="section-padding bg-steel-gray">
      <div className="container-narrow">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6">
              Get Your Free Quote
            </h2>
            <p className="text-lg md:text-xl text-navy/80 font-medium">
              Tell us about your space—any size, any type—and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-navy mx-auto mb-6 flex items-center justify-center">
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
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Quote Request Received!
                </h3>
                <p className="text-steel-gray">
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-navy font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="input-field"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-navy font-bold mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-5555"
                    required
                    className="input-field"
                  />
                </div>

                {/* Warehouse Size Input */}
                <div>
                  <label
                    htmlFor="warehouseSize"
                    className="block text-navy font-bold mb-2"
                  >
                    Space Size
                  </label>
                  <input
                    type="text"
                    id="warehouseSize"
                    name="warehouseSize"
                    value={formData.warehouseSize}
                    onChange={handleChange}
                    placeholder="e.g., 50,000 sq ft or describe your space"
                    required
                    className="input-field"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary w-full text-lg mt-4"
                >
                  Get Free Quote
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default InquiryForm
