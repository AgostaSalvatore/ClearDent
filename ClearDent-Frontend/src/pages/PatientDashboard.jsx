import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const statusLabel = { pending: 'In attesa', contacted: 'Contattato', completed: 'Completato' }
const statusColor = {
  pending: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
}

export default function PatientDashboard() {
  const { user, logout, updateProfile } = useAuth()
  const [contacts, setContacts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(`${API_URL}/api/contacts`).then(res => setContacts(res.data))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await updateProfile(form)
    setSaving(false)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-navy-600">
          Clear<span className="text-teal-500">Dent</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Ciao, <span className="font-medium text-navy-600">{user.name}</span></span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-red-500 transition-colors">Esci</button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Profilo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-navy-600">Il tuo profilo</h2>
            {!editMode
              ? <button onClick={() => setEditMode(true)} className="text-sm text-teal-500 hover:underline">Modifica</button>
              : <div className="flex gap-3">
                  <button onClick={() => setEditMode(false)} className="text-sm text-gray-400 hover:underline">Annulla</button>
                  <button onClick={handleSave} disabled={saving} className="text-sm bg-teal-500 text-white px-4 py-1.5 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-60">
                    {saving ? 'Salvo...' : 'Salva'}
                  </button>
                </div>
            }
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {editMode ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Telefono</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </>
            ) : (
              <>
                <div><p className="text-sm text-gray-500">Nome</p><p className="font-medium text-navy-600">{user.name}</p></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-navy-600">{user.email}</p></div>
                <div><p className="text-sm text-gray-500">Telefono</p><p className="font-medium text-navy-600">{user.phone || '—'}</p></div>
                <div><p className="text-sm text-gray-500">Membro dal</p><p className="font-medium text-navy-600">{new Date(user.created_at).toLocaleDateString('it-IT')}</p></div>
              </>
            )}
          </div>
        </div>

        {/* Prenotazioni */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-navy-600 mb-6">Le tue richieste</h2>
          {contacts.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="mb-4">Nessuna richiesta inviata.</p>
              <Link to="/#contatti" className="text-teal-500 hover:underline text-sm">Prenota una visita →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map(c => (
                <div key={c.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-navy-600">{c.service || 'Richiesta generica'}</p>
                    <p className="text-sm text-gray-500 mt-1">{c.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(c.created_at).toLocaleDateString('it-IT')}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${statusColor[c.status]}`}>
                    {statusLabel[c.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
