import { Link } from 'react-router-dom'

function Navbar() {
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Annotator
          </Link>
          
          <div className="flex gap-4">
            {!token ? (
              <>
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Sign Up
                </Link>
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Dashboard
                </Link>
                <Link to="/post-job" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Post Job
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
