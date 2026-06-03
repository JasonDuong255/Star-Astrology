import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

const controlClass =
  "h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-fg placeholder:text-fg-faint transition focus:outline-none focus:border-brass/60 focus-visible:ring-2 focus-visible:ring-brass/30";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-fg-muted"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-fg-faint">{hint}</p> : null}
    </div>
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
    className={`${controlClass} cursor-pointer appearance-none bg-[length:11px] bg-[right_0.9rem_center] bg-no-repeat pr-9 ${className}`}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%23c9a44f' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
    }}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
