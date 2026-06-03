"use client";

import { ReactNode, useEffect } from "react";
import { X } from "@phosphor-icons/react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Đóng"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-line-strong bg-surface p-6 shadow-float animate-fade-up">
        <div className="flex items-start justify-between gap-4">
          {title ? (
            <h2 className="font-serif text-2xl font-semibold text-fg">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="-mr-1 -mt-1 grid h-8 w-8 place-items-center rounded-lg text-fg-faint transition hover:bg-surface-2 hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
