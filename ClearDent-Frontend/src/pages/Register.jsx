import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setErrors(err.response?.data?.errors || { email: [err.response?.data?.message || 'Errore nella registrazione.'] })
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        type={type} value={form[name]} placeholder={placeholder}
        onChange={e => setForm({ ...form, [name]: e.target.value })}
        className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 dark:text-gray-200"
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name][0]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-2xl font-bold text-navy-600 dark:text-white">
            Clear<span className="text-teal-500">Dent</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Crea il tuo account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {field('name', 'Nome e Cognome *', 'text', 'Mario Rossi')}
            {field('email', 'Email *', 'email', 'mario@esempio.it')}
            {field('phone', 'Telefono', 'tel', '+39 333 000 0000')}
            {field('password', 'Password *', 'password', '••••••••')}
            {field('password_confirmation', 'Conferma Password *', 'password', '••••••••')}

            <button
              type="submit" disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? 'Registrazione...' : 'Crea Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Hai già un account?{' '}
            <Link to="/login" className="text-teal-500 font-medium hover:underline">Accedi</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
