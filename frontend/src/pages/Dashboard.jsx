import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      window.location.href = '/signup'
      return
    }

    setUser(JSON.parse(userData))
    fetchJobs(token)
  }, [])

  const fetchJobs = async (token) => {
    try {
      const response = await axios.get('/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJobs(response.data)
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user?.role === 'expert' ? 'Available Jobs' : 'Your Posted Jobs'}
      </h1>

      {user?.role === 'expert' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {user?.expertise?.map(field => (
              <span key={field} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs available at the moment.</p>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {job.requiredFields?.map(field => (
                    <span key={field} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {field}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${job.compensation}</p>
                  {user?.role === 'expert' && (
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
