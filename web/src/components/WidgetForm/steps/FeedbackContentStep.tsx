import { ArrowLeft, Camera } from "phosphor-react"
import { FormEvent, useState } from "react"
import { feedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContentStepProps {
    feedbackType: feedbackType;
    onFeedbackRestartRequest: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({feedbackType, onFeedbackRestartRequest, onFeedbackSent} : FeedbackContentStepProps) {
    
    const [screenshot, setScreenshot] = useState<String | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]
    
    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        await api.post('/feedback', {
            type: feedbackType,
            comment,
            screenshot
        })

        onFeedbackSent()
    }

    return (
        <>
            <header>
                <button 
                    onClick={onFeedbackRestartRequest}
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img 
                        src={feedbackTypeInfo.image.source} 
                        alt={feedbackTypeInfo.image.alt}
                        className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline resize-none scrollbar-thumb-zinc-700 scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        type="submit"
                        disabled={comment.length===0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading/> : "Enviar feedback"}
                    </button>
                </footer>
            </form>

        </>
    )
}