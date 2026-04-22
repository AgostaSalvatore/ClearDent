import { useInView } from '../hooks/useInView'

const hidden = {
  up:    'opacity-0 translate-y-10',
  down:  'opacity-0 -translate-y-10',
  left:  'opacity-0 -translate-x-10',
  right: 'opacity-0 translate-x-10',
  scale: 'opacity-0 scale-95',
  none:  'opacity-0',
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.15,
}) {
  const [ref, isInView] = useInView(threshold)

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className} ${
        isInView
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : hidden[direction]
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isInView ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
