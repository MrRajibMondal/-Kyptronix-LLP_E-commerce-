<<<<<<< HEAD
export const CATEGORIES = ['Mouse', 'Keyboard', 'Hub', 'Webcam', 'Audio', 'Storage', 'Stand', 'Lighting']
=======
export const CATEGORIES = ['Mouse', 'Keyboard', 'Hub', 'Webcam']
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

export const PRODUCTS = [
  {
    id: 'wireless-mouse',
    name: 'Wireless Mouse',
    category: 'Mouse',
    price: 999,
    mrp: 1499,
    tagline: '2.4GHz precision, 18-month battery',
    description:
      'A quiet, ambidextrous wireless mouse with a 2.4GHz receiver, adjustable DPI, and a battery that comfortably lasts a year and a half on a single charge. Built for long work sessions with a soft-click switch that keeps clatter down in shared spaces.',
    specs: [
      ['Connectivity', '2.4GHz wireless + Bluetooth 5.0'],
      ['Battery life', 'Up to 18 months (1x AA)'],
      ['DPI range', '800 – 3200, adjustable'],
      ['Buttons', '6 programmable buttons'],
      ['Weight', '92g'],
      ['Warranty', '1 year manufacturer warranty']
    ],
images: [
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1613141412501-9012977f1969?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=900&q=80'
],
    rating: 4.5,
    reviews: 1284
  },
  {
    id: 'mechanical-keyboard',
    name: 'Mechanical Keyboard',
    category: 'Keyboard',
    price: 2499,
    mrp: 3499,
    tagline: 'Hot-swappable switches, tactile feel',
    description:
      'A full-size mechanical keyboard with hot-swappable switches, per-key backlighting, and a tactile bump tuned for long typing sessions. Doubleshot PBT keycaps resist shine, and the detachable USB-C cable makes it easy to carry between desks.',
    specs: [
      ['Switch type', 'Hot-swappable tactile (brown)'],
      ['Backlight', 'Per-key RGB, 16.8M colors'],
      ['Keycaps', 'Doubleshot PBT'],
      ['Connectivity', 'USB-C wired, detachable cable'],
      ['Layout', 'Full-size, 104 keys'],
      ['Warranty', '2 year manufacturer warranty']
    ],
images: [
  'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80'
],
    rating: 4.7,
    reviews: 962
  },
  {
    id: 'usb-c-hub',
    name: 'USB-C Hub',
    category: 'Hub',
    price: 1499,
    mrp: 1999,
    tagline: '7-in-1, 100W pass-through power',
    description:
      'A compact 7-in-1 USB-C hub with HDMI out, an SD/TF card reader, two USB-A ports, and 100W pass-through power delivery for your laptop. Aluminium shell keeps it cool during long video calls and 4K exports.',
    specs: [
      ['Ports', 'HDMI, 2x USB-A 3.0, SD/TF, USB-C PD'],
      ['Video output', '4K @ 30Hz via HDMI'],
      ['Power delivery', '100W pass-through'],
      ['Build', 'Aluminium unibody'],
      ['Cable length', '15cm braided'],
      ['Warranty', '1 year manufacturer warranty']
    ],
    images: [
      'https://images.unsplash.com/photo-1616578273461-3a99ce422de6?fm=jpg&q=80&w=900&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.3,
    reviews: 541
  },
  {
    id: 'hd-webcam',
    name: 'HD Webcam',
    category: 'Webcam',
    price: 1799,
    mrp: 2299,
    tagline: '1080p autofocus, built-in noise-cancelling mic',
    description:
      'A 1080p webcam with fast autofocus, a wide 90° field of view, and a built-in noise-cancelling microphone tuned for video calls. The privacy shutter slides shut with one hand, and the clip fits laptops and monitors alike.',
    specs: [
      ['Resolution', '1080p @ 30fps'],
      ['Field of view', '90°'],
      ['Microphone', 'Dual, noise-cancelling'],
      ['Focus', 'Autofocus'],
      ['Mount', 'Universal clip, tripod thread'],
      ['Warranty', '1 year manufacturer warranty']
    ],
images: [
  'https://th.bing.com/th/id/OIP.bIojufLW7mj6QNyo7GfgrQHaHa?w=161&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=80',
  'https://th.bing.com/th/id/OIP.80_Tz1pEyDaedTBDH0vKWQHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
],
    rating: 4.4,
    reviews: 703
<<<<<<< HEAD
  },
  {
    id: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    category: 'Audio',
    price: 2199,
    mrp: 2999,
    tagline: 'ANC, 30-hour case battery',
    description:
      'True wireless earbuds with active noise cancellation, a snug silicone fit, and a pocket-sized charging case good for 30 hours of total playback. Touch controls handle calls, playback, and ANC toggling without reaching for your phone.',
    specs: [
      ['Driver', '10mm dynamic'],
      ['Noise cancelling', 'Active, up to 32dB reduction'],
      ['Battery life', '7h earbuds + 23h case'],
      ['Connectivity', 'Bluetooth 5.3'],
      ['Water resistance', 'IPX4'],
      ['Warranty', '1 year manufacturer warranty']
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.4,
    reviews: 1032
  },
  {
    id: 'portable-ssd-1tb',
    name: 'Portable SSD 1TB',
    category: 'Storage',
    price: 6499,
    mrp: 7999,
    tagline: 'USB-C, up to 1050MB/s transfer',
    description:
      'A pocket-sized 1TB SSD with a shock-resistant aluminium shell and USB-C speeds up to 1050MB/s. Backs up a full photo library in minutes and survives being tossed in a bag between shoots.',
    specs: [
      ['Capacity', '1TB'],
      ['Interface', 'USB-C 3.2 Gen 2'],
      ['Read speed', 'Up to 1050MB/s'],
      ['Build', 'Aluminium, shock-resistant'],
      ['Dimensions', '95 x 55 x 9mm'],
      ['Warranty', '3 year manufacturer warranty']
    ],
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.6,
    reviews: 487
  },
  {
    id: 'aluminium-laptop-stand',
    name: 'Aluminium Laptop Stand',
    category: 'Stand',
    price: 1299,
    mrp: 1799,
    tagline: 'Adjustable height, foldable, ventilated',
    description:
      'A foldable aluminium laptop stand that lifts your screen to eye level and opens up airflow underneath to keep thermals in check. Six height settings adapt it to a standing desk or a coffee-shop table alike.',
    specs: [
      ['Material', 'Aircraft-grade aluminium'],
      ['Height range', '6 adjustable positions'],
      ['Compatibility', '10 – 17 inch laptops'],
      ['Folded size', '260 x 100 x 22mm'],
      ['Weight', '640g'],
      ['Warranty', '1 year manufacturer warranty']
    ],
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.5,
    reviews: 738
  },
  {
    id: 'monitor-light-bar',
    name: 'Monitor Light Bar',
    category: 'Lighting',
    price: 1899,
    mrp: 2499,
    tagline: 'Glare-free desk lighting, app-free dial control',
    description:
      'A screen-mounted light bar that lights your desk without spilling glare onto the display. An asymmetric beam and a wireless dial for brightness and warmth make it a no-fuss upgrade over a desk lamp.',
    specs: [
      ['Light output', '500 lumens, stepless dimming'],
      ['Color temperature', '2700K – 6500K adjustable'],
      ['Mount', 'Clip-on, fits 10 – 34 inch monitors'],
      ['Control', 'Wireless dial, no app required'],
      ['Power', 'USB-C, 5V/1A'],
      ['Warranty', '1 year manufacturer warranty']
    ],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=900&q=80'
    ],
    rating: 4.3,
    reviews: 312
=======
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  }
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

export function relatedProducts(id, count = 3) {
  return PRODUCTS.filter((p) => p.id !== id).slice(0, count)
}
