import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Connect Experts with Annotation Tasks
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A marketplace where experts can showcase their knowledge and companies can find specialized annotators
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Get Started as Expert
            </Link>
            <Link to="/signup" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
              Post a Job
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">For Experts</h3>
            <p className="text-gray-600">Sign up, select your fields of expertise, and get notified about relevant annotation jobs</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">Post Jobs</h3>
            <p className="text-gray-600">Companies can post annotation tasks and target experts in specific fields</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Fair Compensation</h3>
            <p className="text-gray-600">Get paid fairly for your expertise and annotation work</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
