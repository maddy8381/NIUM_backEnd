
const Candidate = require('../models/candidates');
const sequelize = require('sequelize');

exports.postCandidateDetails = (req, res, next) => {
    const uname = req.body.uname;
    const jobTitle = req.body.jobTitle;
    const jobCompany = req.body.jobCompany;
    const jobDescription = req.body.jobDescription;
    console.log('hi');
    Candidate.create({
        name: uname,
        jobTitle: jobTitle,
        jobCompany: jobCompany,
        jobDescription: jobDescription
    })
        .then(result => {
            return res.status(201).json({
                message: 'Resume Details Added Successfully',
                resumeId: result.id
            });
        })
        .catch(err => {
            return res.status(400).json({
                errorMessage: 'Bad Request'
            })
        });

};

exports.getResumeById = (req, res, next) => {
    const resumeId = req.params.resumeId;
    Candidate.findByPk(resumeId)
        .then(candidate => {
            console.log(candidate);
            if (!candidate) {
                const error = new Error('Could not find resume by ID: ' + resumeId);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Candidate found by Resume ID: ' + resumeId,
                candidate: [candidate]
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};


exports.getResumeByName = (req, res, next) => {
    const candidateName = req.params.candidateName;
    const actualCandidateName = candidateName.replace("+", " ");

    //TODO: use contains operator and check for firstname and lastname separately.
    Candidate.findAll({ where: { name: actualCandidateName } })
        .then(result => {
            let candidatesArray = [];
            if (result.length === 0) {
                let nameArray = actualCandidateName.split(" ");
                Candidate.findAll({
                    where: {
                        name: {
                            [sequelize.Op.like]: '%' + nameArray[0] + '%'
                        }
                    }
                }).then(firstNameResult => {
                    candidatesArray = firstNameResult;

                    Candidate.findAll({
                        where: {
                            name: {
                                [sequelize.Op.like]: '%' + nameArray[1] + '%'
                            }
                        }
                    }).then(lastNameResult => {
                        candidatesArray = candidatesArray.concat(lastNameResult);

                        if (candidatesArray.length === 0) {
                            const error = new Error('Could not find candidate with given name');
                            error.statusCode = 404;
                            throw error;
                        }
                        res.status(200).json({
                            message: 'Candidate found by Name',
                            candidate: candidatesArray
                        });
                    })
                        .catch(err => {
                            if (!err.statusCode) {
                                err.statusCode = 500;
                            }
                            next(err);
                        });

                })
            } else {
                res.status(200).json({
                    message: 'Candidate found by Name',
                    candidate: result
                });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};