export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1920&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 via-navy-700/75 to-navy-600/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-teal-400 font-semibold uppercase tracking-widest text-sm mb-4">
            Studio Dentistico Professionale
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Il Sorriso Che
            <br />
            <span className="text-teal-400">Hai Sempre</span>
            <br />
            Sognato
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
            Benvenuti in ClearDent, dove la cura orale incontra l&apos;eccellenza.
            Offriamo trattamenti all&apos;avanguardia in un ambiente confortevole e
            accogliente.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contatti" className="btn-primary">
              Prenota una Visita
            </a>
            <a href="#servizi" className="btn-outline">
              I Nostri Servizi
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-10">
            {[
              { value: '15+', label: 'Anni di Esperienza' },
              { value: '5.000+', label: 'Pazienti Soddisfatti' },
              { value: '98%', label: 'Tasso di Soddisfazione' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-teal-400 font-serif text-3xl font-bold">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero card */}
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Prenota Oggi</p>
                <p className="text-white/70 text-sm">Risposta entro 24 ore</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: '📍', text: 'Via Roma 45, Milano' },
                { icon: '📞', text: '+39 02 1234 5678' },
                { icon: '🕐', text: 'Lun–Ven 9:00 – 19:00' },
                { icon: '📅', text: 'Sabato 9:00 – 13:00' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm">
                  <span>{item.icon}</span>
                  <span className="text-white/85">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#chi-siamo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scorri in basso"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
