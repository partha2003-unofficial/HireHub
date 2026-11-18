import type { Request, Response } from 'express'
import applicationModel from '../model/application.model.ts';
import { createApplicationValidation } from '../validators/application.validation.ts';
import { Types } from 'mongoose';
import jobModel from '../model/job.model.ts';

export async function applyForJob(request: Request, response: Response): Promise<Response> {
    try {
        /*edge cases handling */
        const jobId = request.params.jobid || null;
        if (jobId === null) { return response.status(400).json({ message: 'jobId did not given' }) }
        const { data, error } = createApplicationValidation.safeParse(request.body)
        if (error) { return response.status(400).json({ message: 'all required detailes are did not given' }) }
        if (!request.user?.id) { return response.status(400).json({ message: "user is did not given" }) }


        const appliedUser = await applicationModel.findOne({
            candidate: request.user?.id || null,
            job: jobId
        })
        if (appliedUser != null) {
            return response.status(400).json({
                message: "this user is already applyed this job",
                appliedUser: appliedUser
            })
        }

        const job = await jobModel.findById(jobId.toString())
        if (!job) { return response.status(400).json({ message: 'job is not found !' }) }
        if (job.status === 'CLOSED' ||
            job.applicationDeadline &&
            job.applicationDeadline?.getTime() <= Date.now()) {
            return response.status(400).json({
                message: 'you can not apply this job'
            })
        }

        /*execution */
        const applyedJob = await applicationModel.create({
            ...data,
            candidate: new Types.ObjectId(request.user?.id),
            job: new Types.ObjectId(jobId.toString()),
            status: 'APPLIED'
        })
        if (!applyedJob) { return response.status(400).json({ message: 'application in this job is did not happend' }) }

        return response.status(200).json({
            message: 'application is created',
            applicaitonDetailes: applyedJob
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getCandidatesApplication(request: Request, response: Response): Promise<Response> {
    try {
        if (!request.user?.id) { return response.status(400).json({ message: 'req.user.id is not found' }) }
        const application = await applicationModel.findOne({
            candidate: request.user.id
        }).populate('job')
        if (application === null) { return response.status(400).json({ message: "application not founded !" }) }

        return response.status(200).json({
            message: 'application founded',
            applicationDetailes: application
        })

    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getApplicationByApplicationId(request: Request, response: Response): Promise<Response> {
    try {
        const applicationId = request.params.applicationid;
        if (!applicationId) { return response.status(400).json({ message: "params is not defined" }) }
        if (!request.user?.id) { return response.status(400).json({ message: 'req.use.id is not founded' }) }

        const application = await applicationModel.findById(applicationId).populate('job');
        if (application === null) { return response.status(400).json({ message: 'application did not founded !' }) };

        return response.status(200).json({
            message: 'application founded ',
            applicationDetailes: application
        })

    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function applicationWithdraw(request: Request, response: Response): Promise<Response> {
    try {
        /*edge cases handle */
        const applicationId = request.params.applicationid;
        if (!applicationId) { return response.status(400).json({ message: "params is not defined" }) }
        if (!request.user?.id) { return response.status(400).json({ message: 'req.use.id is not founded' }) }

        const application = await applicationModel.findById(applicationId);
        if (application === null) { return response.status(400).json({ message: 'application did not founded !' }) };

        if (application.candidate._id.toString() !== request.user.id) {
            return response.status(400).json({ message: 'this candidate is not create this application' })
        }

        if (['UNDER_REVIEW', 'REJECTED', 'HIRED'].includes(application.status)) {
            return response.status(400).json({ message: 'you can not withdraw this application because it is UNDER_REVIEW,REJECTED,HIRED now' })
        }
        
        /*execution */
        application.status = 'WITHDRAWN';
        await application.save();

        return response.status(200).json({
            message: 'job withdraw successfully'
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}