// Bold runs written as **like this** and italics as *like this*, rendered inline.
export default function Rich({ text }) {
  const parts = String(text ?? '').split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**') && p.length > 4) return <strong key={i} className="text-strong font-semibold">{p.slice(2, -2)}</strong>
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}
