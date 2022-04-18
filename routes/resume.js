const express = require('express');

const resumeController = require('../controllers/resume');
const router = express.Router();

router.post('/uploadResumeDetails', resumeController.postCandidateDetails);

router.get('/getResumeById/:resumeId', resumeController.getResumeById);

router.get('/getResumeByName/:candidateName', resumeController.getResumeByName);

module.exports = router;