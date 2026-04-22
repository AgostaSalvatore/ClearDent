import Reveal from './Reveal'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=600&q=80',
    alt: 'Sala operatoria',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80',
    alt: 'Dentista al lavoro',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80',
    alt: 'Strumenti professionali',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    alt: 'Reception dello studio',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&q=80',
    alt: 'Tecnologia digitale',
    span: 'col-span-2',
  },
]

export default function Gallery() {
  return (
    <section id="galleria" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="section-subtitle">La Struttura</p>
          <h2 className="section-title">Il Nostro Studio</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
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
