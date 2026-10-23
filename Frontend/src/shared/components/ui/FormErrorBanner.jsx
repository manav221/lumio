import Alert from './Alert'
import { LucideArrowUp } from 'lucide-react'

const HANDLER = {
    INVALID_CREDENTIALS: (err) => <Alert variant='error'>{err.message}</Alert>,
    USER_ALREADY_EXISTS: (err) => <Alert variant='error'>{err.message}</Alert>,
    EMAIL_NOT_VERIFIED: (err) => <Alert
        variant='warning'
        action={<button
            type='button'
            className='h-full shrink-0 flex items-center justify-center p-1.5 hover:bg-neutral-300/10'>
            <LucideArrowUp />
        </button>}
    >
        {err.message}
    </Alert>

}

const defaultHandler = (err) => {
    return <Alert variant='error'>{err.message || "Something went wrong"}</Alert>
}

const FormErrorBanner = ({ err }) => {
    if (!err) return null;

    const handler = HANDLER[err.code] ?? defaultHandler
    return handler?.(err) ?? null;
}

export default FormErrorBanner