import React from 'react'
import CodeBlockHeader from './CodeBlockHeader'

const extractCode = (node) => {
    if (typeof node === "string" || typeof node === "number") {
        return node;
    }

    if (Array.isArray(node)) {
        return node.map(extractCode).join("");
    }

    if (React.isValidElement(node)) {
        return extractCode(node.props.children);
    }

    return "";
}

const CodeBlock = ({ children }) => {
    const match = /language-([\w+#-]+)/.exec(children.props.className || "");
    const language = match?.[1] || "text";
    const code = extractCode(children).replace(/\n$/, "");
    return (
        <div>
            <CodeBlockHeader lang={language} code={code} />
            <pre>
                {children}
            </pre>
        </div>
    )
}

export default CodeBlock