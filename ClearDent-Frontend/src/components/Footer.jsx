const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C10 2 6 6.5 6 11c0 3 1 5 2 7l2 10c0 1 1 2 2 2h8c1 0 2-1 2-2l2-10c1-2 2-4 2-7 0-4.5-4-9-10-9z"
                  fill="#00A9A5"
                />
              </svg>
              <span className="font-serif text-xl font-bold text-white">
                Clear<span className="text-teal-500">Dent</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Studio dentistico professionale a Milano. Tecnologie avanzate, equipe
              qualificata e un approccio umano per il tuo sorriso.
            </p>
            <div className="flex gap-3 mt-5">
              {['Facebook', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
                >
                  <span className="text-xs font-bold">
                    {social === 'Facebook' ? 'f' : 'ig'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm">
              {['Igiene e Prevenzione', 'Implantologia', 'Ortodonzia', 'Sbiancamento', 'Endodonzia', 'Chirurgia Orale'].map((s) => (
                <li key={s}>
                  <a href="#servizi" className="hover:text-teal-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li>Via Roma 45, 20121 Milano</li>
              <li>
                <a href="tel:+390212345678" className="hover:text-teal-400 transition-colors">
                  +39 02 1234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@cleardent.it" className="hover:text-teal-400 transition-colors">
                  info@cleardent.it
                </a>
              </li>
              <li className="pt-2 border-t border-white/10">
                Lun–Ven: 9:00 – 19:00
                <br />
                Sabato: 9:00 – 13:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} ClearDent Studio Dentistico. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
