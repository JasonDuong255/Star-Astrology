"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import Modal from "@/components/ui/Modal";
import AuthForm from "./AuthForm";

export default function LoginDialog({
  open,
  onClose,
  onAuthed,
  supabase,
}: {
  open: boolean;
  onClose: () => void;
  onAuthed: () => void;
  supabase: SupabaseClient | null;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Đăng nhập để tiếp tục">
      <p className="-mt-2 mb-4 text-sm text-white/60">
        Lập và xem lá số là miễn phí. Đăng nhập để lưu lá số và mở khoá luận
        giải.
      </p>
      <AuthForm supabase={supabase} onSuccess={onAuthed} />
    </Modal>
  );
}
