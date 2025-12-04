import { useFadeInOnScrollMultiple } from '../hooks/useFadeInOnScroll'

function Services() {
  const services = [
    {
      title: 'Warehouse Cleaning',
      description:
        'Complete warehouse sanitation from ceiling to floor. We tackle dust, debris, and grime with industrial-grade equipment, leaving your facility spotless and inspection-ready.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      features: ['Full facility deep clean', 'Racking & shelving dusting', 'Debris removal'],
    },
    {
      title: 'Industrial Power Washing',
      description:
        'High-pressure cleaning for concrete floors, loading docks, and exterior surfaces. Our commercial-grade power washing removes oil stains, tire marks, and years of accumulated buildup.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      features: ['Loading dock restoration', 'Oil & grease removal', 'Exterior surface cleaning'],
    },
    {
      title: 'Floor Buffing & Stripping',
      description:
        'Professional floor care that restores and protects your surfaces. We strip old wax, repair damage, and apply fresh coatings that gleam under warehouse lighting.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      features: ['Wax stripping & recoating', 'Concrete polishing', 'Epoxy floor care'],
    },
    {
      title: 'Wall Deep-Cleans',
      description:
        'Comprehensive wall washing that eliminates scuff marks, dust accumulation, and surface contamination. Essential for maintaining clean room standards and professional appearance.',
      image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80',
      features: ['Scuff mark removal', 'Dust elimination', 'Surface sanitization'],
    },
    {
      title: 'Post-Construction Cleanup',
      description:
        'Specialized cleaning for newly built or renovated facilities. We remove construction dust, debris, and residue so your space is move-in ready.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      features: ['Construction debris removal', 'Fine dust extraction', 'Final polish & detail'],
    },
    {
      title: 'Scheduled Maintenance',
      description:
        'Regular cleaning programs tailored to your operational schedule. Keep your facility consistently clean without disrupting productivity.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
      features: ['Weekly/monthly programs', 'Off-hours scheduling', 'Custom cleaning plans'],
    },
  ]

  const { setRef, isVisible } = useFadeInOnScrollMultiple(services.length)

  return (
    <section id="services" className="bg-white">
      {/* Section Header */}
      <div className="section-padding bg-steel-gray">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6">
            Industrial Cleaning Services
          </h2>
          <p className="text-lg md:text-xl text-navy/80 max-w-3xl mx-auto font-medium">
            Trusted industrial cleaners delivering professional results—from massive warehouses to commercial spaces and beyond. These are our specialties, but we take on any cleaning challenge.
          </p>
        </div>
      </div>

      {/* Staggered Service Blocks */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0

        return (
          <div
            key={index}
            ref={setRef(index)}
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-steel-gray/30'}`}
          >
            <div className="container-narrow">
              <div
                className={`grid lg:grid-cols-2 gap-0 lg:gap-16 items-center transition-all duration-1000 ${
                  isVisible(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-72 md:h-96 lg:h-[500px] overflow-hidden ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-navy/10" />
                </div>

                {/* Content */}
                <div
                  className={`py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Service number */}
                  <span className="inline-block text-steel-gray/40 font-black text-6xl md:text-7xl mb-4">
                    0{index + 1}
                  </span>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy mb-6">
                    {service.title}
                  </h3>

                  <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-navy font-medium"
                      >
                        <svg
                          className="w-5 h-5 text-navy flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* CTA Section */}
      <div className="section-padding bg-navy">
        <div className="container-narrow text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6">
            Ready for a Cleaner Facility?
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Get a free, no-obligation quote for any commercial, industrial, or specialty cleaning project.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block bg-white text-navy font-bold px-10 py-4 text-lg hover:bg-steel-gray transition-colors duration-200"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
