import { Router } from 'express'
import { candidateAuthenticationMiddleware } from '../middleware/candidate.middleware.ts'
import { applicationWithdraw, applyForJob, getApplicationByApplicationId, getCandidatesApplication } from '../controller/application.controller.ts'

const applicationRoute = Router()

applicationRoute.get('/candidates/applications', candidateAuthenticationMiddleware, getCandidatesApplication)

applicationRoute.get('/:applicationid', getApplicationByApplicationId)
applicationRoute.patch('/:applicationid/withdraw', candidateAuthenticationMiddleware, applicationWithdraw)
applicationRoute.post('/:jobid/apply', candidateAuthenticationMiddleware, applyForJob)

export default applicationRoute;