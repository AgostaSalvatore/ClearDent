import { useState, useEffect, useCallback } from 'react'
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
const services = ['Igiene e Prevenzione', 'Implantologia', 'Ortodonzia', 'Sbiancamento Dentale', 'Endodonzia', 'Chirurgia Orale', 'Prima Visita / Consulenza']

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [contacts, setContacts] = useState([])
  const [meta, setMeta] = useState({})
  const [filters, setFilters] = useState({ service: '', status: '', search: '' })
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('contacts')

  const fetchContacts = useCallback(() => {
    const params = { page, ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)) }
    axios.get(`${API_URL}/api/contacts`, { params }).then(res => {
      setContacts(res.data.data)
      setMeta(res.data)
    })
  }, [filters, page])

  useEffect(() => { fetchContacts() }, [fetchContacts])

  useEffect(() => {
    if (activeTab === 'users' && user.role === 'owner') {
      axios.get(`${API_URL}/api/users`).then(res => setUsers(res.data))
    }
  }, [activeTab, user.role])

  const updateStatus = async (id, status) => {
    await axios.patch(`${API_URL}/api/contacts/${id}`, { status })
    fetchContacts()
  }

  const updateRole = (userId, role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
    axios.patch(`${API_URL}/api/users/${userId}/role`, { role }).catch(() => {
      axios.get(`${API_URL}/api/users`).then(res => setUsers(res.data))
    })
  }

  const tabs = [{ id: 'contacts', label: 'Prenotazioni' }]
  if (user.role === 'owner') tabs.push({ id: 'users', label: 'Utenti' })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-navy-600">
          Clear<span className="text-teal-500">Dent</span>
          <span className="ml-2 text-xs font-normal text-gray-400 uppercase tracking-wider">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${user.role === 'owner' ? 'bg-purple-500' : 'bg-teal-500'}`} />
            {user.name} · <span className="capitalize">{user.role}</span>
          </span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-red-500 transition-colors">Esci</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-8">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t.id ? 'bg-white text-navy-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Filtri */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-wrap gap-4">
              <input
                placeholder="Cerca per nome o email..."
                value={filters.search}
                onChange={e => { setFilters({ ...filters, search: e.target.value }); setPage(1) }}
                className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select value={filters.service} onChange={e => { setFilters({ ...filters, service: e.target.value }); setPage(1) }}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Tutti i servizi</option>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={filters.status} onChange={e => { setFilters({ ...filters, status: e.target.value }); setPage(1) }}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Tutti gli stati</option>
                <option value="pending">In attesa</option>
                <option value="contacted">Contattato</option>
                <option value="completed">Completato</option>
              </select>
            </div>

            {/* Tabella */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Nome', 'Email', 'Telefono', 'Servizio', 'Messaggio', 'Data', 'Stato'].map(h => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {contacts.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">Nessuna prenotazione trovata.</td></tr>
                    ) : contacts.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-navy-600">{c.name}</td>
                        <td className="px-5 py-4 text-gray-500">{c.email}</td>
                        <td className="px-5 py-4 text-gray-500">{c.phone || '—'}</td>
                        <td className="px-5 py-4 text-gray-500">{c.service || '—'}</td>
                        <td className="px-5 py-4 text-gray-500 max-w-xs truncate">{c.message}</td>
                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString('it-IT')}</td>
                        <td className="px-5 py-4">
                          <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 ${statusColor[c.status]}`}>
                            <option value="pending">In attesa</option>
                            <option value="contacted">Contattato</option>
                            <option value="completed">Completato</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginazione */}
              {meta.last_page > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Pagina {meta.current_page} di {meta.last_page} · {meta.total} totali</p>
                  <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">Precedente</button>
                    <button disabled={page === meta.last_page} onClick={() => setPage(p => p + 1)}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">Successiva</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && user.role === 'owner' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Nome', 'Email', 'Telefono', 'Ruolo', 'Registrato il'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-navy-600">{u.name}</td>
                      <td className="px-5 py-4 text-gray-500">{u.email}</td>
                      <td className="px-5 py-4 text-gray-500">{u.phone || '—'}</td>
                      <td className="px-5 py-4">
                        {u.id === user.id
                          ? <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">owner</span>
                          : <select value={u.role} onChange={e => updateRole(u.id, e.target.value)}
                              className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                              <option value="patient">patient</option>
                              <option value="staff">staff</option>
                              <option value="owner">owner</option>
                            </select>
                        }
                      </td>
                      <td className="px-5 py-4 text-gray-400">{new Date(u.created_at).toLocaleDateString('it-IT')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
