import { Ban, TriangleAlert, Info, CheckCheck, X } from "lucide-react";

const STYLES = {
    success: "bg-emerald-600/10 border-emerald-600/30 text-emerald-500",
    error: "bg-red-600/10 border-red-600/30 text-red-500",
    warning: "bg-yellow-600/10 border-yellow-600/30 text-yellow-500",
    info: "bg-blue-600/10 border-blue-600/30 text-blue-500",
};

const ICONS = {
    success: <CheckCheck />,
    error: <Ban />,
    warning: <TriangleAlert />,
    info: <Info />,
};

const Alert = ({ variant = "error", children, action, onClose, className = "" }) => {
    if (!children) return null;

    const style = STYLES[variant] ?? STYLES.error;
    const icon = ICONS[variant] ?? ICONS.error;

    return (
        <div
            role="alert"
            className={`w-full flex items-center justify-between border rounded-lg overflow-hidden text-base ${style} ${className}`}
        >
            <div className="flex items-center gap-2 px-3 py-2 min-w-0">
                <div className="shrink-0 p-1 rounded-full">{icon}</div>
                <span className="flex-1 min-w-0">{children}</span>
            </div>

            {action && <div className="shrink-0 h-full">{action}</div>}

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="h-full shrink-0 flex items-center justify-center hover:bg-neutral-300/10"
                >
                    <X size={15} />
                </button>
            )}
        </div>
    );
};

export default Alert;