const express = require('express')
const { createJob, getAllJobs, getJobById, applyForJob } = require('../controllers/jobController')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.post('/', authMiddleware, createJob)
router.get('/', authMiddleware, getAllJobs)
router.get('/:id', authMiddleware, getJobById)
router.post('/:id/apply', authMiddleware, applyForJob)

module.exports = router
