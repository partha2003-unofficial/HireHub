import type { Request, Response, NextFunction } from 'express'
import { createCandidateValidation, modifyCandidateValidation } from '../validators/candidate.validation.ts'
import candidateModel from '../model/candidate.model.ts'
import { Types } from 'mongoose'

export async function createCandidateProfile(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling*/
        const { data, error } = createCandidateValidation.safeParse(request?.body)
        if (error) {
            return response.status(400).json({ message: 'please enter all required data' })
        }

        if (await candidateModel.findOne({ user: request.user?.id || null }) !== null) {
            return response.status(400).json({ message: 'this candidate already created profile' })
        }

        /*execution*/
        const candidate = await candidateModel.create({
            ...data,
            user: new Types.ObjectId(request.user?.id)
        })
        if (candidate === null) {
            return response.status(400).json({ message: 'candidate profile is not created' })
        }

        return response.status(200).json({
            message: 'candidate profile created ',
            candidateINFO: candidate
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getCandidateProfile(request: Request, response: Response): Promise<Response> {
    try {
        const candidateProfile = await candidateModel.findOne({ user: request.user?.id || null });
        if (candidateProfile === null) {
            return response.status(400).json({ message: 'this candidate did not created profile' })
        }

        return response.status(200).json({
            message: 'candidte profile founded ',
            candidateProfileINFO: candidateProfile
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function modifyCandidateProfile(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling*/
        const { data, error } = modifyCandidateValidation.safeParse(request?.body)
        if (error) {
            return response.status(400).json({ message: 'please enter all valid edit data' ,error:error.flatten()})
        }

        const candidate = await candidateModel.findOne({ user: request.user?.id || null });
        if (candidate === null) {
            return response.status(400).json({ message: 'this candidate did not exsist' })
        }

        /*execution*/
        const modifyCandidate = await candidate?.updateOne(
            { $set: { ...data } },
            { new: true }
        )
        if (modifyCandidate === null) {
            return response.status(400).json({ message: 'candidate profile is not created' })
        }

        return response.status(200).json({
            message: 'candidate profile created ',
            updatedCandidateINFO: modifyCandidate
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function uploadResume(request: Request, response: Response): Promise<Response> {
    try {

        return response.status(200).json({
            message: ''
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export async function getCandidateProfiles(request: Request, response: Response): Promise<Response> {
    try {
        const candidateProfileId = request.params.candidateId || null;
        if (candidateProfileId === null) {
            response.status(400).json({ message: "please enter candidate profile" })
        }

        const candidate = await candidateModel.findById(candidateProfileId);
        if (candidate === null) {
            return response.status(400).json({ message: 'candidate is did not founded according to this id' })
        }
        return response.status(200).json({
            message: 'candidate is founded',
            candidateProfile: candidate
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}