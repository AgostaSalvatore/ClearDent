no# 🦷 ClearDent — Sito Studio Dentistico

Sito web professionale per uno studio dentistico, costruito come progetto di vibe coding.

---

## Struttura del progetto

```
E:\Dev\ClearDent\
├── ClearDent-Frontend/   → React + Vite + Tailwind CSS
└── ClearDent-Backend/    → Laravel 11 (API)
```

---

## Tecnologie usate

| Parte | Tecnologia |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Laravel 11, PHP 8.4 |
| Database | MySQL (`cleardent`) |
| Dev environment | Laravel Herd |
| Automazione | n8n + Telegram Bot |

---

## Come avviare in locale

### Frontend
```bash
cd ClearDent-Frontend
npm run dev
```
Apri → http://localhost:5173

### Backend
Nessun comando necessario — **Herd serve automaticamente** il backend su:
```
http://cleardent-backend.test
```

---

## Sezioni del sito

- **Hero** — immagine di copertina con headline e CTA
- **Chi Siamo** — presentazione dello studio
- **I Nostri Servizi** — 6 servizi (igiene, implantologia, ortodonzia, sbiancamento, endodonzia, chirurgia)
- **Il Team** — card dei dentisti
- **Galleria** — foto dello studio
- **Contatti** — form di contatto + indirizzo/orari

---

## Form di contatto → Telegram

Quando un utente compila il form:

```
Utente → Form → Laravel API → n8n Webhook → Telegram Bot → Messaggio su Telegram
```

### Configurazione

Nel file `ClearDent-Backend/.env`:

```env
N8N_WEBHOOK_URL=https://turix.app.n8n.cloud/webhook/cleardent-contact
```

Il bot Telegram **@Cleardentbot** invia una notifica con i dati del contatto.

---

## Variabili d'ambiente

### Backend — `ClearDent-Backend/.env`

| Variabile | Valore |
|-----------|--------|
| `APP_URL` | `http://cleardent-backend.test` |
| `DB_CONNECTION` | `mysql` |
| `DB_DATABASE` | `cleardent` |
| `DB_USERNAME` | `root` |
| `DB_PASSWORD` | `root` |
| `N8N_WEBHOOK_URL` | URL del webhook n8n |
| `FRONTEND_URL` | `http://localhost:5173` |

### Frontend — `ClearDent-Frontend/.env`

| Variabile | Valore |
|-----------|--------|
| `VITE_API_URL` | `http://cleardent-backend.test` |

---

## API Backend

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `POST` | `/api/contact` | Riceve il form e notifica via n8n |
| `GET` | `/up` | Health check |

### Esempio richiesta `/api/contact`

```json
{
  "name": "Mario Rossi",
  "email": "mario@esempio.it",
  "phone": "+39 333 000 0000",
  "service": "Implantologia",
  "message": "Vorrei una consulenza."
}
```

---

## Setup n8n (workflow)

1. **Nodo Webhook** — Method `POST`, path `cleardent-contact`
2. **Nodo Telegram** — invia messaggio con i dati del form al chat ID configurato

