import type { Request, Response } from 'express'
import { createCompanyValidation, updateCompanyValidation } from "../validators/company.validation.ts";
import userModel from '../model/user.model.ts';
import companyModel from '../model/company.model.ts';

export async function createCompany(request: Request, response: Response): Promise<Response> {
    try {
        const { data, error } = createCompanyValidation.safeParse(request.body);
        /*error handling*/
        if (error) {
            return response.status(400).json({
                message: 'give me valid information',
                error: error.message
            })
        }
        const user = await userModel.findById(request.user?.id);
        if (user === null || !user) {
            return response.status(400).json({
                message: 'user is did not found !'
            })
        }
        if (
            user.role !== "EMPLOYER" ||
            user.isVarified === false ||
            user.isActive === false
        ) {
            return response.status(400).json({
                message: 'this user is not validate'
            })
        }

        /*execution*/
        const company = await companyModel.create({
            ...data,
            owner: user._id
        })
        if (!company) {
            return response.status(400).json({
                message: 'company not created'
            })
        }

        return response.status(200).json({
            message: 'company created successfully',
            companyDetailes: company
        })

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error on create company controller'
        })
    }
}

export async function updateCompany(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling*/
        const companyId = request.params.id || null;
        const { data, error } = updateCompanyValidation.safeParse(request.body);
        if (error || companyId === null) {
            return response.status(400).json({
                message: 'please enter companyId and requied detailes',
                error: error?.message
            })
        }

        const company = await companyModel.findById(companyId);
        if (company === undefined) {
            response.status(400).json({
                message: 'company is not fond !',
                companyId: companyId
            })
        }

        if (!company?.owner?.equals(request.user?.id)) {
            return response.status(400).json({
                message: 'this company is not build by this owner',
                ownerId: request.user?.id,
                companyOwner: company?.owner
            })
        }

        /*execution */
        const updateCompany = await company?.updateOne(
            { $set: { ...data } }
        )

        if (updateCompany === null) {
            return response.status(400).json({
                message: 'company did not updated !'
            })
        }

        return response.status(200).json({
            message: 'company detailes updated successfully. '
        })

    } catch (error) {
        return response.status(500).json({
            message: 'internal sever error'
        })
    }
}

export async function getCompany(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const companyId = request.params?.id;
        if (companyId === null) {
            return response.status(400).json({
                message: 'company id is not given'
            })
        }

        const company = await companyModel.findById(companyId);
        if (!company) {
            return response.status(400).json({
                message: 'company not founded'
            })
        }

        if (!company?.owner.equals(request.user?.id)) {
            return response.status(400).json({
                message: 'this user not created this company',
                userId: request.user?.id
            })
        }

        /*execution*/
        return response.status(200).json({
            message: 'company fatched successfully',
            comanyDetailes: company
        })
    } catch (error) {
        return response.status(500).json({
            message: 'internal server error'
        })
    }
}
export async function deleteCompany(request: Request, response: Response): Promise<Response> {
    try {
        /*error handling */
        const companyId = request.params?.id;
        if (companyId === null) {
            return response.status(400).json({
                message: 'company id is not given'
            })
        }

        const company = await companyModel.findById(companyId);
        if (!company) {
            return response.status(400).json({
                message: 'company not founded'
            })
        }

        if (!company?.owner.equals(request.user?.id)) {
            return response.status(400).json({
                message: 'this user not created this company',
                userId: request.user?.id
            })
        }

        /*execution*/
        await company.deleteOne({ _id: companyId });
        return response.status(200).json(
            {
                message: 'company was deletad successfully',
                company_id: companyId
            })

    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}