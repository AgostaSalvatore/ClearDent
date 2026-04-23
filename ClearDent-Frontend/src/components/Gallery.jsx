import Reveal from './Reveal'

const photos = [
  {
    src: 'https://images.pexels.com/photos/33812025/pexels-photo-33812025.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    alt: 'Sala d\'attesa dello studio',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80',
    alt: 'Dentista al lavoro',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80',
    alt: 'Sala operatoria moderna',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=85',
    alt: 'Attrezzatura dentale moderna',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=85',
    alt: 'Studio dentistico moderno',
    span: 'col-span-2',
  },
]

export default function Gallery() {
  return (
    <section id="galleria" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="section-subtitle">La Struttura</p>
          <h2 className="section-title">Il Nostro Studio</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Un ambiente moderno, confortevole e all&apos;avanguardia, pensato per farti sentire
            a tuo agio durante ogni visita.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <Reveal
              key={i}
              direction="scale"
              delay={i * 100}
              duration={600}
              className={photo.span}
              threshold={0.1}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
