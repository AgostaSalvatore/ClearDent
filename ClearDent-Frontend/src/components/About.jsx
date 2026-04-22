import Reveal from './Reveal'

const features = [
  'Tecnologie digitali di ultima generazione',
  'Equipe multidisciplinare altamente specializzata',
  'Ambiente sterile e certificato',
  'Trattamenti personalizzati per ogni paziente',
  'Sedazione cosciente disponibile',
  'Preventivi trasparenti e piani di pagamento flessibili',
]

export default function About() {
  return (
    <section id="chi-siamo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images — slide from left */}
          <Reveal direction="left" duration={800}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80"
                  alt="Studio dentistico ClearDent"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[180px]">
                <p className="text-5xl font-serif font-bold text-teal-500">15+</p>
                <p className="text-navy-600 font-medium text-sm mt-1">Anni di esperienza</p>
              </div>
              <div className="absolute -top-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&q=80"
                  alt="Strumenti dentali"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Content — slide from right */}
          <Reveal direction="right" duration={800} delay={100}>
            <div>
              <p className="section-subtitle">Chi Siamo</p>
              <h2 className="section-title">
                La Tua Salute Orale è la Nostra Priorità
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                ClearDent nasce dalla passione per la salute orale e dal desiderio di offrire
                un&apos;esperienza dentistica completamente diversa: professionale, umana e senza
                stress. Il nostro studio si trova nel cuore di Milano e accoglie pazienti di
                tutte le età.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Utilizziamo solo tecnologie certificate e materiali di alta qualità. Ogni
                trattamento viene pianificato insieme al paziente, con massima trasparenza sui
                costi e sui risultati attesi.
              </p>

              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700"
                    style={{
                      opacity: 0,
                      animation: 'fadeUp 0.5s ease-out forwards',
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#contatti" className="btn-primary">
                Prenota una Visita
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
