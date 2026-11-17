import { Router } from 'express'
import { candidateAuthenticationMiddleware } from '../middleware/candidate.middleware.ts';
import { createCandidateProfile, getCandidateProfile, getCandidateProfiles, modifyCandidateProfile, uploadResume } from '../controller/candidate.controller.ts';
import { employerAuthenticationMiddleware } from '../middleware/employer.middleware.ts';
const candidateRouter = Router();

candidateRouter.route('/profile')
    .post(candidateAuthenticationMiddleware, createCandidateProfile)
    .get(candidateAuthenticationMiddleware, getCandidateProfile)
    .put(candidateAuthenticationMiddleware, modifyCandidateProfile)

candidateRouter.post('/resume', candidateAuthenticationMiddleware, uploadResume)
candidateRouter.get('/:candidateId', employerAuthenticationMiddleware, getCandidateProfiles)

export default candidateRouter;