"use client";

import { WarningCircle } from "@phosphor-icons/react";
import ThienBan from "@/components/brand/ThienBan";
import { Button } from "@/components/ui/Button";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      {children}
    </div>
  );
}

export function ChartEmpty() {
  return (
    <Shell>
      <ThienBan className="h-32 w-32 opacity-30" />
      <p className="mt-6 font-serif text-xl text-fg">
        Lá số của bạn sẽ hiện ở đây
      </p>
      <p className="mt-2 max-w-xs text-sm text-fg-muted">
        Điền thông tin bên cạnh rồi bấm “An lá số” để dựng thiên bàn 12 cung.
      </p>
    </Shell>
  );
}

export function ChartLoading() {
  return (
    <Shell>
      <ThienBan variant="loading" className="h-36 w-36" />
      <p className="mt-6 font-serif text-xl text-fg">Đang an sao…</p>
      <p className="mt-2 text-sm text-fg-muted">
        Định cục và sắp các sao lên mười hai cung.
      </p>
    </Shell>
  );
}

export function ChartError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <Shell>
      <span className="grid h-14 w-14 place-items-center rounded-full border border-cinnabar/40 text-cinnabar">
        <WarningCircle size={26} weight="duotone" />
      </span>
      <p className="mt-5 font-serif text-xl text-fg">Chưa thể dựng lá số</p>
      <p className="mt-2 max-w-xs text-sm text-fg-muted">
        {message || "Vui lòng kiểm tra lại ngày và giờ sinh rồi thử lại."}
      </p>
      {onRetry ? (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          Thử lại
        </Button>
      ) : null}
    </Shell>
  );
}
