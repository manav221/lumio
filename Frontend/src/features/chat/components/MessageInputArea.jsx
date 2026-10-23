import useConversation from '../hooks/useConversation';
import Button from './Button';
import { Mic, Plus, ToolCase, CornerLeftUp, CircleStop } from 'lucide-react';

const InputAreaButtons = [
    { title: "Attach files", type: "button", name: "files", icon: <Plus size={18} /> },
    { title: "Tools", type: "button", name: "tools", icon: <ToolCase size={18} /> },
]

const MessageInputArea = () => {
    const { 
        userMessage, setUserMessage, handleSubmit,
        isRecord, handleVoiceInput
    } = useConversation();

    return (
        <div className="shrink-0 px-3 pb-3 pt-2 sm:px-6 sm:pb-5">
            <div className="mx-auto max-w-3xl">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-zinc-300/80 bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition focus-within:border-zinc-400 relative"
                >

                    <textarea
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                e.currentTarget.form?.requestSubmit();
                            }
                        }}
                        placeholder={isRecord ? "Listening..." : "Ask Lumio..."}
                        rows={2}
                        className="max-h-40 min-h-12 w-full resize-none bg-transparent px-1 py-2 text-sm leading-6 outline-none placeholder:text-zinc-400"
                    />

                    <div className="flex items-center gap-0.5">
                        {
                            InputAreaButtons.map((btn, indx) => (
                                <Button key={indx} className={
                                    btn.name === "send message" && "ml-auto"} props={btn}
                                />
                            ))
                        }
                        <div className='flex items-center gap-1 ml-auto'>
                            <button
                                title={"Voice input"}
                                aria-label={"Voice input"}
                                type='button'
                                onClick={handleVoiceInput}
                                className={`flex h-9 w-9 items-center justify-center rounded-xl
                 text-zinc-500 transition hover:bg-zinc-100 ml-auto ${isRecord && "bg-zinc-100"}`}
                            >
                                {
                                    isRecord
                                        ? <CircleStop size={18} />
                                        : <Mic size={18} />
                                }
                            </button>
                            <button
                                title="Send message"
                                aria-label="Send message"
                                type="submit"
                                className={`
    ml-auto flex h-9 w-9 shrink-0
    items-center justify-center
    rounded-xl bg-zinc-900
    text-white shadow-sm
    transition-all duration-200
    hover:bg-zinc-700 hover:shadow-md
    disabled:cursor-not-allowed
    disabled:bg-zinc-200
    disabled:text-zinc-400
    disabled:shadow-none`}
                            >
                                <CornerLeftUp size={18} />
                            </button>
                        </div>
                    </div>


                </form>

                <p className="mt-3 text-center text-[10px] leading-4 text-zinc-400 sm:text-xs">
                    AI can make mistakes. Check important information.
                    <span className="hidden sm:inline"> Your conversations stay organized in your chat history.</span>
                </p>
            </div>
        </div>
    )
}

export default MessageInputArea