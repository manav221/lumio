import { useSelector } from 'react-redux';
import useConversation from '../hooks/useConversation';
import UserMessage from './UserMessage'
import AiMessage from './AiMessage';
import WelcomeMsg from "../components/WelcomeMsg";

const MessageArea = () => {
    const { messages } = useSelector(store => store.chat);
    const { streamMessageToken, messageStatus } = useConversation();

    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto hide-scroll">
            {messages.length === 0 ? (
                <WelcomeMsg />
            ) : (
                <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
                    {messages?.map((message, index) => {
                        return <div key={index}>
                            {message.role === "user" && <UserMessage message={message} />}
                            {
                                message.role === "ai" && (
                                    <AiMessage message={message.content} />
                                )
                            }
                        </div>
                    })}
                    {
                        messageStatus && <div className='shimmer-text cursor-pointer'>
                            Generating...
                        </div>
                    }
                    {
                        streamMessageToken && (
                            <div className="text-sm leading-7">
                                <AiMessage message={streamMessageToken} />
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default MessageArea