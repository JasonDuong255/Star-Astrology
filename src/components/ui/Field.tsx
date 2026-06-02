import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

const controlClass =
  "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block space-y-1.5">
      <span className="text-sm font-medium text-white/80">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-white/40">{hint}</span> : null}
    </label>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input ref={ref} className={`${controlClass} ${className}`} {...props} />
));
Input.displayName = "Input";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className = "", children, ...props }, ref) => (
  <select
    ref={ref}
    className={`${controlClass} appearance-none ${className}`}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
