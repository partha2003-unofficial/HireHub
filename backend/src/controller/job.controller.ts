import type { Request, Response } from 'express'
import { createJobValidator, updateJobValidator } from '../validators/job.validator.ts'
import companyModel from '../model/company.model.ts'
import jobModel from '../model/job.model.ts'
import { Types } from 'mongoose'

export async function createJob(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const { data, error } = createJobValidator.safeParse(request.body ?? null)
        if (error) {
            return response.status(400).json({ message: 'please enter correct data' })
        }

        const company = await companyModel.findOne({ owner: request.user?.id || null })
        if (company === null) {
            return response.status(400).json({ message: 'this owner has no company so cannot create job' })
        }

        const createJob = await jobModel.create({ ...data })

        if (createJob === null) {
            return response.status(400).json({ message: 'job did not created!' })
        }

        return response.status(200).json({
            message: 'job created successful ',
            job: createJob
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getJob(request: Request, response: Response): Promise<Response> {
    try {
        const jobId = request.params?.jobid || null;
        if (jobId === null) {
            return response.status(400).json({ message: 'jobID is not getetd' })
        }

        const job = await jobModel.findById(jobId);
        if (job === null) {
            return response.status(400).json({ message: 'job not found' })
        }

        return response.status(200).json({
            message: 'job founded ',
            jobDetailes: job
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function updateJob(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const jobId = request.params?.jobid || null;
        if (jobId === null) {
            return response.status(400).json({ message: 'did not give jobId' })
        }

        const { data, error } = updateJobValidator.safeParse(request.body ?? null);
        if (error) {
            return response.status(400).json({ message: 'valid data is required !' })
        }

        const job = await jobModel.findById(jobId);
        if (job === null) {
            return response.status(400).json({ message: 'did not found job by this id ' })
        }

        if (job.employer !== new Types.ObjectId(request.user?.id)) {
            return response.status(400).json({ message: 'this employer is did not create this job , so he did not modify this job' })
        }

        const updateJob = await job.updateOne({ ...data });
        if (!updateJob) { return response.status(400).json({ message: 'update unsuccessfull ' }) }

        /*execution */
        return response.status(200).json({
            message: 'update is successful',
            updateJob: updateJob
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function deleteJob(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const jobId = request.params?.jobid || null;
        if (jobId === null) {
            return response.status(400).json({ message: 'did not give jobId' })
        }

        const job = await jobModel.findById(jobId);
        if (job === null) {
            return response.status(400).json({ message: 'did not found job by this id ' })
        }

        if (job.employer !== new Types.ObjectId(request.user?.id)) {
            return response.status(400).json({ message: 'this employer is did not create this job , so he did not delete this job' })
        }

        /*execution */
        const jobDelete = await job.deleteOne({ _id: jobId });
        if (jobDelete === null) {
            return response.json({ message: 'job did not deleted' })
        }

        return response.status(200).json({
            message: 'job deleted successfully',
            jobId: jobId
        })

    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function closeJob(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const jobId = request.params?.jobid || null;
        if (jobId === null) {
            return response.status(400).json({ message: 'did not give jobId' })
        }

        const job = await jobModel.findById(jobId);
        if (job === null) {
            return response.status(400).json({ message: 'did not found job by this id ' })
        }

        if (job.employer !== new Types.ObjectId(request.user?.id)) {
            return response.status(400).json({ message: 'this employer is did not create this job , so he did not close this job' })
        }

        if (job.status === 'CLOSED') {
            return response.status(200).json({ message: 'job is already closed !' })
        }

        /*execution */
        job.status = 'CLOSED';
        const jobUpdate = await job.save();
        if (jobUpdate === null) {
            return response.status(400).json({ message: 'job did not closed !' })
        }

        return response.status(200).json({
            message: 'job closed successfully',
            "job that is closed": job
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getCreatedJobByEmployer(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const jobId = request.params?.jobid || null;
        if (jobId === null) {
            return response.status(400).json({ message: 'did not give jobId' })
        }

        /*execution */
        const jobs = await jobModel.find({ employer: request.user?.id || null })
        if (jobs.length === 0) {
            return response.status(400).json({ message: 'there are no jobs' })
        }

        return response.status(200).json({
            message: 'jobs are founded',
            jobs: jobs
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}