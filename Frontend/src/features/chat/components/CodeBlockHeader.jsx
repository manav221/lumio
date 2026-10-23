import { Code, Copy, Check } from 'lucide-react';
import useCopy from '../hooks/useCopy';

const CodeBlockHeader = ({ lang, code }) => {
    const { copyText, copied } = useCopy();
    return (
        <header className='py-1 px-2 rounded-t-lg border border-b-0 border-zinc-200 bg-[#f4f3efdf] flex items-center justify-between'>
            <div className='flex items-center gap-3 select-none'>
                <Code size={15} />
                <span className='text-sm font-semibold'>{lang}</span>
            </div>
            <div className='hover:bg-zinc-200 p-1 rounded-lg'>
                {copied
                    ? <Check size={15} />
                    : <Copy size={15} onClick={() => { copyText(code) }} />
                }
            </div>
        </header>
    )
}

export default CodeBlockHeader