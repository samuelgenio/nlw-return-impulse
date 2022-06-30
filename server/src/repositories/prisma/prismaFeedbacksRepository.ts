import { FeedbackData, FeedbackRepository } from "../feedbacksRepository";
import { prisma } from './../../prisma';

export class PrismaFeedbackRepository implements FeedbackRepository{

    async create({type, comment, screenshot}: FeedbackData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })
    }

}