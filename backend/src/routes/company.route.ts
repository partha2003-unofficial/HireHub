import { Router } from 'express';
import { createCompany, deleteCompany, getCompany, updateCompany } from '../controller/company.controller.ts';
import { employerAuthenticationMiddleware } from '../middleware/employer.middleware.ts';

const companyRouter = Router();

companyRouter.post('/create', employerAuthenticationMiddleware, createCompany)
companyRouter.route('/:id')
    .get(getCompany)
    .patch(employerAuthenticationMiddleware, updateCompany)
    .delete(employerAuthenticationMiddleware, deleteCompany);

export default companyRouter;