import { useEffect, useState } from 'react'
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, Plus, Calendar } from 'lucide-react'

const Card = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
)

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl h-[120px] overflow-hidden">
      <div className="w-full h-full bg-white/5 animate-pulse" />
    </div>
  </div>
)

const CertCard = ({ cert, onDelete }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden p-5 flex flex-col justify-between h-[120px] transition-all duration-300 group-hover:bg-white/10">
        <div>
          <h3 className="text-white font-semibold text-base line-clamp-2">{cert.title || 'Untitled Certificate'}</h3>
          <p className="text-gray-400 text-xs mt-2 flex items-center gap-1.5">
             <Calendar className="w-3.5 h-3.5" />
             {cert.year || 'Unknown Year'}
          </p>
        </div>
        <button
          onClick={() => onDelete(cert.id)}
          className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCerts = async () => {
    setLoading(true)
    const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
    setCerts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchCerts() }, [])

  const handleAddCertificate = async (e) => {
    e.preventDefault()
    if (!title || !year) return
    setUploading(true)
    try {
      const { error: insertError } = await supabase.from('certificates').insert({ title, year })
      if (insertError) throw insertError

      setTitle("")
      setYear("")
      fetchCerts()
    } catch (error) {
      alert("Error adding certificate: " + error.message)
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const deleteCert = async (id) => {
    if (!confirm('Delete this certificate?')) return
    await supabase.from('certificates').delete().eq('id', id)
    fetchCerts()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl blur opacity-50" />
          <div className="relative w-9 h-9 bg-[#020202] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-red-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Certificates</h1>
          <p className="text-gray-500 text-xs">
            {loading ? 'Loading...' : `${certs.length} certificates total`}
          </p>
        </div>
      </div>

      {/* Add Certificate Form */}
      <Card>
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Plus className="w-4 h-4 text-red-400" /> Add Certificate
          </h2>

          <form onSubmit={handleAddCertificate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-medium">Certificate Name</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Frontend Web Development"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-medium">Year / Date</label>
                <input 
                  type="text" 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2023 or Jan 2024"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={uploading || !title || !year} className="relative group/u">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />
                <div className="relative flex items-center gap-2 px-6 py-2 bg-[#020202] rounded-xl border border-white/10">
                  {uploading ? <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Plus className="w-3.5 h-3.5 text-red-400" />}
                  <span className="text-sm font-medium text-white">{uploading ? 'Adding...' : 'Add Certificate'}</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </Card>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No certificates yet.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {certs.map(cert => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  )
}
