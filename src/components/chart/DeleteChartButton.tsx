"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function DeleteChartButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!window.confirm("Xoá lá số này?")) return;
    setBusy(true);
    const supabase = createClient();
    await supabase.from("charts").delete().eq("id", id);
    setBusy(false);
    router.refresh();
  }

  return (
    <Button variant="ghost" onClick={onDelete} disabled={busy}>
      {busy ? "Đang xoá…" : "Xoá"}
    </Button>
  );
}
