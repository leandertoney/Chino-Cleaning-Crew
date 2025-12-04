import { useEffect, useRef, useState } from 'react'

export function useFadeInOnScroll(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}

export function useFadeInOnScrollMultiple(count, options = {}) {
  const refs = useRef([])
  const [visibleItems, setVisibleItems] = useState(new Set())

  useEffect(() => {
    const observers = []

    refs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
            observer.unobserve(element)
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -50px 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [count, options.threshold, options.rootMargin])

  const setRef = (index) => (el) => {
    refs.current[index] = el
  }

  const isVisible = (index) => visibleItems.has(index)

  return { setRef, isVisible }
}

export default useFadeInOnScroll
