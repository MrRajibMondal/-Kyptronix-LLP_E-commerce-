import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { formatINR, discountPercent } from '../utils/format.js'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'

const AUTO_MS = 4500

export default function HeroSwiper() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const slides = PRODUCTS

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTO_MS)
    return () => window.clearInterval(timerRef.current)
  }, [slides.length])

  function pauseAndResume(fn) {
    window.clearInterval(timerRef.current)
    fn()
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTO_MS)
  }

  return (
    <section className="hero-swiper" aria-roledescription="carousel" aria-label="Featured products">
      <div className="hero-swiper-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((product) => {
          const off = discountPercent(product.price, product.mrp)
          return (
            <div className="hero-slide" key={product.id}>
              <div className="hero-slide-copy">
                <p className="hero-eyebrow">{product.category} · Featured this week</p>
                <h1>{product.name}</h1>
                <p className="hero-slide-tagline">{product.tagline}</p>
                <div className="hero-slide-price">
                  <span className="price">{formatINR(product.price)}</span>
                  {off > 0 && (
                    <>
                      <span className="price-strike">{formatINR(product.mrp)}</span>
                      <span className="hero-slide-off">{off}% off</span>
                    </>
                  )}
                </div>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  View details
                </Link>
              </div>
              <div className="hero-slide-media">
                <img src={product.images[0]} alt={product.name} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="hero-swiper-arrow left"
        onClick={() => pauseAndResume(prev)}
        aria-label="Previous product"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="hero-swiper-arrow right"
        onClick={() => pauseAndResume(next)}
        aria-label="Next product"
      >
        <ChevronRightIcon />
      </button>

      <div className="hero-swiper-dots" role="tablist" aria-label="Select featured product">
        {slides.map((product, i) => (
          <button
            key={product.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${product.name}`}
            className={`hero-dot${i === index ? ' active' : ''}`}
            onClick={() => pauseAndResume(() => goTo(i))}
          />
        ))}
      </div>
    </section>
  )
}
