import { File, X } from "lucide-react";

const FileChip = ({ fileName = "clip.wav", onRemove }) => {
    return (
        <div className="group inline-flex items-center gap-3 rounded-xl border border-orange-200/70 bg-white p-1.5 shadow-sm transition-all duration-200 hover:border-orange-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-orange-500/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                <File size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
                    {fileName}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Audio
                </p>
            </div>

            <button
                type="button"
                aria-label={`Remove ${fileName}`}
                onClick={() => { }}
                className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/15 dark:hover:text-orange-400"
            >
                <X size={15} />
            </button>
        </div>
    );
};

export default FileChip;