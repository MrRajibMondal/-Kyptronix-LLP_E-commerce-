export default function TraceDivider({ label }) {
  return (
    <div className="trace-divider" role="presentation">
      <span className="trace-node" />
      <span className="trace-line" />
      {label && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
          {label}
        </span>
      )}
      <span className="trace-line" />
      <span className="trace-node" />
    </div>
  )
}
