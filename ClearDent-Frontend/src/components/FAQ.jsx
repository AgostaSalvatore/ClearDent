import { useState } from 'react'

const faqs = [
  {
    question: 'Con quale frequenza dovrei fare una visita di controllo?',
    answer:
      'Consigliamo una visita di controllo ogni 6 mesi. Una prevenzione regolare permette di individuare precocemente eventuali carie, problemi gengivali o altre patologie, evitando trattamenti più invasivi e costosi in futuro.',
  },
  {
    question: "Lo sbiancamento dentale è sicuro?",
    answer:
      'Sì, lo sbiancamento professionale eseguito in studio è sicuro ed efficace. Utilizziamo prodotti a base di perossido di idrogeno a concentrazione controllata, sotto supervisione del dentista. I risultati durano in media 1-2 anni con una corretta igiene orale.',
  },
  {
    question: 'Quanto dura un impianto dentale?',
    answer:
      'Un impianto dentale, se curato correttamente, può durare tutta la vita. La sua longevità dipende dall\'igiene orale quotidiana, dalle visite di controllo periodiche e da abitudini come il fumo, che può comprometterne l\'integrazione nell\'osso.',
  },
  {
    question: 'I trattamenti ortodontici sono solo per i bambini?',
    answer:
      'Assolutamente no. L\'ortodonzia funziona a qualsiasi età. Per gli adulti che desiderano discrezione, offriamo soluzioni come gli allineatori trasparenti (tipo Invisalign) che raddrizzano i denti senza apparecchi metallici visibili.',
  },
  {
    question: 'Cosa fare in caso di dolore acuto o emergenza dentale?',
    answer:
      'Chiamaci subito al nostro numero: gestiamo le urgenze con priorità assoluta. In caso di dolore intenso, gonfiore o trauma, cerchiamo di ricevere il paziente in giornata. Non rimandare: un\'emergenza trattata tempestivamente evita complicazioni gravi.',
  },
  {
    question: 'Quanto tempo dura una seduta di pulizia dentale professionale?',
    answer:
      'Una seduta di igiene professionale dura mediamente 45-60 minuti. Include la rimozione del tartaro (igiene sopra e sotto-gengivale), la lucidatura degli smalti e i consigli personalizzati per la cura a casa.',
  },
  {
    question: 'Offrite soluzioni per i pazienti ansiosi o fobici?',
    answer:
      'Sì. Sappiamo che la paura del dentista è molto comune. Il nostro team è formato per accogliere i pazienti ansiosi con calma e rispetto. Lavoriamo con tecniche di sedazione consapevole e prendiamo tutto il tempo necessario per far sentire ogni paziente a proprio agio.',
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-navy-600 pr-4">{question}</span>
        <span className="flex-shrink-0 w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-subtitle">Hai dei dubbi?</p>
          <h2 className="section-title">Domande Frequenti</h2>
          <p className="text-gray-500 mt-4">
            Rispondiamo alle domande più comuni dei nostri pazienti. Non trovi quello che cerchi?{' '}
            <a href="#contatti" className="text-teal-500 font-medium hover:underline">
              Contattaci
            </a>
            .
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
