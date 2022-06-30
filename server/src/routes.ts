import express from 'express'
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';

export const routes = express.Router()

//use https://mailtrap.io/ to test


routes.post('/feedbacks', async (req, res) => {

    const {type, comment, screenshot} = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodeMailerAdapter = new NodeMailerAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodeMailerAdapter);

    await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot
        })

    return res.status(201)
})

