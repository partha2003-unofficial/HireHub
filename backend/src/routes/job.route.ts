import { Router } from 'express';
import { employerAuthenticationMiddleware } from '../middleware/employer.middleware.ts';
import { closeJob, createJob, deleteJob, getCreatedJobByEmployer, getJob, updateJob } from '../controller/job.controller.ts';

const jobRouter = Router();

jobRouter.post('/create', employerAuthenticationMiddleware, createJob);

jobRouter.route('/:jobid')
    .get(getJob)
    .patch(employerAuthenticationMiddleware, updateJob)
    .delete(employerAuthenticationMiddleware, deleteJob)

jobRouter.patch('/:jobid/close', employerAuthenticationMiddleware, closeJob)
jobRouter.get('/employer', employerAuthenticationMiddleware, getCreatedJobByEmployer)

export default jobRouter;