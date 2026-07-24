export const CATEGORIES = ['Mouse', 'Keyboard', 'Hub', 'Webcam']

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
  }
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

export function relatedProducts(id, count = 3) {
  return PRODUCTS.filter((p) => p.id !== id).slice(0, count)
}
