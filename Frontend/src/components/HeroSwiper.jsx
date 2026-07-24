import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { formatINR, discountPercent } from '../utils/format.js'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'

<<<<<<< HEAD
const AUTO_MS = 5000

export default function HeroSwiper() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const timerRef = useRef(null)
  const trackRef = useRef(null)
  const touchStartX = useRef(0)
=======
const AUTO_MS = 4500

export default function HeroSwiper() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const slides = PRODUCTS

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

<<<<<<< HEAD
  // Autoplay — pauses whenever the pointer rests on the slider so people
  // can read a slide without it jumping away mid-sentence.
  useEffect(() => {
    if (paused) return undefined
=======
  useEffect(() => {
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTO_MS)
    return () => window.clearInterval(timerRef.current)
<<<<<<< HEAD
  }, [slides.length, paused, index])

  function manualGoTo(i) {
    window.clearInterval(timerRef.current)
    goTo(i)
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    setPaused(true)
  }

  function handleTouchEnd(e) {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 40) manualGoTo(index - 1)
    else if (delta < -40) manualGoTo(index + 1)
    setPaused(false)
  }

  return (
    <section
      className="hero-swiper"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="hero-swiper-track"
        ref={trackRef}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((product, i) => {
          const off = discountPercent(product.price, product.mrp)
          return (
            <div className="hero-slide" key={product.id} aria-hidden={i !== index}>
=======
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
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
                <img src={product.images[0]} alt={product.name} loading={i === 0 ? 'eager' : 'lazy'} />
=======
                <img src={product.images[0]} alt={product.name} loading={index === 0 ? 'eager' : 'lazy'} />
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="hero-swiper-arrow left"
<<<<<<< HEAD
        onClick={() => manualGoTo(index - 1)}
=======
        onClick={() => pauseAndResume(prev)}
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        aria-label="Previous product"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="hero-swiper-arrow right"
<<<<<<< HEAD
        onClick={() => manualGoTo(index + 1)}
=======
        onClick={() => pauseAndResume(next)}
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        aria-label="Next product"
      >
        <ChevronRightIcon />
      </button>

<<<<<<< HEAD
      <div className="hero-swiper-counter" aria-hidden="true">
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

=======
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      <div className="hero-swiper-dots" role="tablist" aria-label="Select featured product">
        {slides.map((product, i) => (
          <button
            key={product.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${product.name}`}
            className={`hero-dot${i === index ? ' active' : ''}`}
<<<<<<< HEAD
            onClick={() => manualGoTo(i)}
          >
            {i === index && (
              <span
                className="hero-dot-progress"
                style={{ animationPlayState: paused ? 'paused' : 'running', animationDuration: `${AUTO_MS}ms` }}
              />
            )}
          </button>
=======
            onClick={() => pauseAndResume(() => goTo(i))}
          />
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        ))}
      </div>
    </section>
  )
}
