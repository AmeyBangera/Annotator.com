import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EXPERTISE_FIELDS = [
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Healthcare',
  'Finance',
  'Legal',
  'Content Moderation',
  'Image Annotation',
  'Audio Transcription',
  'Video Analysis',
  'Other'
]

function PostJob() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredFields: [],
    compensation: '',
    deadline: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFieldChange = (field) => {
    setFormData(prev => ({
      ...prev,
      requiredFields: prev.requiredFields.includes(field)
        ? prev.requiredFields.filter(f => f !== field)
        : [...prev.requiredFields, field]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/signup'
      return
    }

    if (formData.requiredFields.length === 0) {
      setError('Please select at least one required field')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8">Post a Job</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., Image Annotation for Dataset"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Describe the annotation task in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Required Expertise</label>
            <div className="space-y-2 border p-4 rounded-lg max-h-40 overflow-y-auto">
              {EXPERTISE_FIELDS.map(field => (
                <label key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.requiredFields.includes(field)}
                    onChange={() => handleFieldChange(field)}
                    className="mr-2"
                  />
                  <span className="text-sm">{field}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Compensation ($)</label>
            <input
              type="number"
              name="compensation"
              value={formData.compensation}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostJob
