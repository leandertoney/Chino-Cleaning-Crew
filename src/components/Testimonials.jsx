import { useFadeInOnScrollMultiple } from '../hooks/useFadeInOnScroll'

function Testimonials() {
  const testimonials = [
    {
      name: 'Robert Martinez',
      role: 'Warehouse Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      quote: 'Transformed our floor in hours—pro team!',
    },
    {
      name: 'Sarah Chen',
      role: 'Facility Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      quote: 'Best industrial cleaners we have ever hired. Reliable, thorough, professional.',
    },
    {
      name: 'James Wilson',
      role: 'Plant Supervisor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      quote: 'Our warehouse has never looked this good. They exceeded expectations.',
    },
  ]

  const { setRef, isVisible } = useFadeInOnScrollMultiple(testimonials.length)

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-steel-gray max-w-2xl mx-auto font-medium">
            See what facility managers are saying about our work.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={setRef(index)}
              className={`bg-white border-2 border-steel-gray/20 p-8 md:p-10 card-lift transition-all duration-700 ${
                isVisible(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Avatar */}
              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 object-cover rounded-full grayscale"
                />
              </div>

              {/* Stars */}
              <div className="text-2xl text-navy mb-4 tracking-wider">
                ★★★★★
              </div>

              {/* Quote */}
              <blockquote className="text-navy text-lg font-semibold mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Attribution */}
              <div>
                <p className="text-navy font-bold">{testimonial.name}</p>
                <p className="text-steel-gray text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
