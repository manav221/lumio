import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'
import CodeBlock from "./CodeBlock";

const AiMessage = ({ message }) => {
    return <div
        className="prose prose-slate max-w-none
    prose-headings:font-semibold
    prose-headings:text-slate-900
    prose-h1:text-2xl
    prose-h2:text-xl
    prose-h3:text-lg
    prose-p:text-slate-700
    prose-p:leading-7
    prose-a:text-blue-600
    prose-a:no-underline
    hover:prose-a:underline
    prose-strong:font-semibold
    prose-strong:text-slate-900
    prose-li:text-slate-700
    prose-ul:my-4
    prose-ol:my-4
    prose-li:my-1
    prose-blockquote:border-l-4
    prose-blockquote:border-slate-300
    prose-blockquote:text-slate-600
    prose-hr:border-slate-200
    prose-pre:bg-[#f4f3ef]
    prose-pre:border
    prose-pre:border-zinc-200
    prose-code:before:content-none
    prose-code:after:content-none
    prose-table:border-collapse
    prose-th:border
    prose-th:border-slate-200
    prose-th:bg-slate-50
    prose-th:px-3
    prose-th:py-2
    prose-td:border
    prose-td:border-slate-200
    prose-td:px-3
    prose-td:py-2"
    >
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                pre:CodeBlock
            }}
        >
            {message}
        </ReactMarkdown>
    </div>
}

export default AiMessage