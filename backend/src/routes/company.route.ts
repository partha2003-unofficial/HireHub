import { Router } from 'express';
import { createCompany, deleteCompany, getCompany, updateCompany } from '../controller/company.controller.ts';

const companyRouter = Router();

companyRouter.post('/create', createCompany)
companyRouter.route('/:id')
    .get(getCompany)
    .patch(updateCompany)
    .delete(deleteCompany);

export default companyRouter;