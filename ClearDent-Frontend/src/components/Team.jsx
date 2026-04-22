const team = [
  {
    name: 'Dr. Marco Ferretti',
    role: 'Direttore Sanitario & Implantologia',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    desc: 'Specializzato in implantologia avanzata con oltre 15 anni di esperienza. Formazione presso l\'Università di Milano e perfezionamento a Barcellona.',
  },
  {
    name: 'Dr.ssa Elena Rossi',
    role: 'Ortodonzista & Odontoiatria Pediatrica',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    desc: 'Esperta in ortodonzia invisibile e odontoiatria per bambini. Crea un ambiente accogliente e sereno per i pazienti più giovani.',
  },
  {
    name: 'Dr. Luca Bianchi',
    role: 'Endodontista & Chirurgia Orale',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    desc: 'Specialista in endodonzia e chirurgia orale mininvasiva. Utilizza le più moderne tecnologie per interventi precisi e confortevoli.',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-24 bg-navy-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-400 font-semibold uppercase tracking-widest text-sm mb-3">
            I Professionisti
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Il Nostro Team
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            Dentisti altamente qualificati, aggiornati continuamente sulle ultime tecniche e
            tecnologie, pronti a prendersi cura del tuo sorriso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-teal-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-white/60 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
