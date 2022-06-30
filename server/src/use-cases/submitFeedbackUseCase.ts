import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackData {
    type: string,
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
        ) {}

    async execute(request: SubmitFeedbackData) {
        const {type, comment, screenshot} =  request;

        if (!type) {
            throw new Error('Type is required')
        }

        if (!comment) {
            throw new Error('Comment is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbackRepository.create({type, comment, screenshot})

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans:serif;font-size: 16px; color: #111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Tipo do feedback: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : null,
                `</div>`
            ].join('\n')
        })

    }

}