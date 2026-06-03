"use client";

import { useState } from "react";
import { Sparkle } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

/**
 * PLACEHOLDER: tính năng luận giải sẽ được phát triển sau.
 * Bấm khi chưa đăng nhập → mở pop-up đăng nhập (qua requireAuth);
 * khi đã đăng nhập → hiện thông báo "đang phát triển".
 */
export default function LuanGiaiButton() {
  const { requireAuth } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => requireAuth(() => setOpen(true))}
      >
        <Sparkle size={16} weight="duotone" />
        Luận giải lá số
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Luận giải lá số">
        <p className="text-sm text-fg-muted">
          Tính năng luận giải tự động đang được phát triển. Cảm ơn bạn đã đăng
          nhập, hãy quay lại sau nhé!
        </p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setOpen(false)}>Đã hiểu</Button>
        </div>
      </Modal>
    </>
  );
}
