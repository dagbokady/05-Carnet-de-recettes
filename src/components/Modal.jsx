import { useEffect } from "react";

export const fieldCls =
    "w-full rounded-lg border border-hairline bg-white px-3 py-3.5 text-[16px] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-ink focus:ring-1 focus:ring-ink";

export default function Modal({ open, onClose, titre, width = "max-w-[568px]", children }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-[14px] bg-white elev-1`}
            >
                <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-hairline bg-white px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-ink hover:bg-surface-strong"
                    >
                        ✕
                    </button>
                    <h2 className="text-[16px] font-semibold text-ink">{titre}</h2>
                </div>
                {children}
            </div>
        </div>
    );
}
