// Small hand-drawn line icons used as product placeholders and status
// glyphs, so the app has no dependency on external image assets.

export function MouseIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="14" y="6" width="20" height="36" rx="10" />
      <line x1="24" y1="6" x2="24" y2="20" />
      <line x1="24" y1="14" x2="24" y2="20" strokeWidth="3" />
    </svg>
  )
}

export function KeyboardIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="5" y="14" width="38" height="22" rx="3" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={9 + col * 5.6}
            y={18 + row * 5.6}
            width="3.6"
            height="3.6"
            rx="0.8"
            fill="currentColor"
            stroke="none"
          />
        ))
      )}
    </svg>
  )
}

export function HubIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="10" y="18" width="28" height="12" rx="3" />
      <line x1="6" y1="24" x2="10" y2="24" />
      <line x1="38" y1="24" x2="42" y2="24" />
      <circle cx="16" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CartGlyphIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 10h5l4.5 22h19L39 17H14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="38" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="33" cy="38" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CheckGlyphIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <circle cx="24" cy="24" r="20" />
      <path d="M15 24.5l6 6 12-13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CrossGlyphIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <circle cx="24" cy="24" r="20" />
      <path d="M18 18l12 12M30 18L18 30" strokeLinecap="round" />
    </svg>
  )
}

export const GLYPHS = {
  mouse: MouseIcon,
  keyboard: KeyboardIcon,
  hub: HubIcon
}

export function HeartIcon({ filled, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M12 20.2s-7.5-4.6-10-9.4C.4 7 2.6 3.6 6.2 3.2c2-.2 3.8.8 5.8 3 2-2.2 3.8-3.2 5.8-3 3.6.4 5.8 3.8 4.2 7.6-2.5 4.8-10 9.4-10 9.4z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="4" y="16" width="24" height="16" rx="2" />
      <path d="M28 21h8l6 6v5h-14z" strokeLinejoin="round" />
      <circle cx="14" cy="36" r="3.4" fill="currentColor" stroke="none" />
      <circle cx="36" cy="36" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="20" y1="20" x2="15.3" y2="15.3" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

export function TagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M11 3H4v7l10 10 7-7L11 3z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

<<<<<<< HEAD
export function PackageIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 2.6l8.5 4.9v9L12 21.4l-8.5-4.9v-9L12 2.6z" strokeLinejoin="round" />
      <path d="M3.5 7.5L12 12.4l8.5-4.9M12 12.4v9" strokeLinejoin="round" />
    </svg>
  )
}

=======
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
export function CashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <line x1="5" y1="9" x2="5" y2="9.01" strokeLinecap="round" strokeWidth="2.4" />
      <line x1="19" y1="15" x2="19" y2="15.01" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  )
}
