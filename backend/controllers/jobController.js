const Job = require('../models/Job')
const User = require('../models/User')

const createJob = async (req, res) => {
  try {
    const { title, description, requiredFields, compensation, deadline } = req.body
    const userId = req.userId

    const job = new Job({
      title,
      description,
      requiredFields,
      compensation,
      deadline,
      postedBy: userId
    })

    await job.save()

    res.status(201).json({
      message: 'Job posted successfully',
      job
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)

    let query = { status: 'open' }

    // If user is an expert, filter jobs by their expertise
    if (user.role === 'expert' && user.expertise.length > 0) {
      query = {
        status: 'open',
        requiredFields: { $in: user.expertise }
      }
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })

    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('applications.user', 'name email')

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id
    const userId = req.userId

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      app => app.user.toString() === userId
    )

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' })
    }

    job.applications.push({ user: userId })
    await job.save()

    res.json({ message: 'Application submitted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createJob, getAllJobs, getJobById, applyForJob }
