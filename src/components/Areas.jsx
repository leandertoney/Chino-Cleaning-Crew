import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

function Areas() {
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

  const { ref, isVisible } = useFadeInOnScroll()

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-narrow">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6">
            Areas We Serve
          </h2>
          <p className="text-lg md:text-xl text-steel-gray max-w-2xl mx-auto font-medium">
            Proudly serving businesses of all types across Central Pennsylvania.
          </p>
        </div>

        {/* Counties Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {counties.map((county, index) => (
            <div
              key={index}
              className="bg-steel-gray/10 py-6 px-4 text-center transition-all duration-300 hover:bg-navy hover:text-white group"
            >
              <span className="font-bold text-navy group-hover:text-white transition-colors duration-300">
                {county}
              </span>
              <span className="block text-sm text-steel-gray group-hover:text-white/80 mt-1 transition-colors duration-300">
                County
              </span>
            </div>
          ))}
        </div>

        {/* Service Area Note */}
        <p
          className={`text-center text-steel-gray mt-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Don't see your area? Have a unique project? Contact us—we never say no.
        </p>
      </div>
    </section>
  )
}

export default Areas
