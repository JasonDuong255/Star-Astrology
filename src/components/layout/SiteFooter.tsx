import Link from "next/link";
import Sigil from "@/components/brand/Sigil";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-brass">
              <Sigil size={24} />
              <span className="font-serif text-lg font-semibold text-fg">
                Tử Vi
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              Chuyển ngày giờ sinh thành lá số Tử Vi Đẩu Số trực quan, an sao đầy
              đủ và trình bày sáng rõ.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-fg-faint">
              Lá số
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
              <li>
                <Link href="/charts/new" className="transition hover:text-brass">
                  Lập lá số
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition hover:text-brass">
                  Lịch sử lá số
                </Link>
              </li>
              <li>
                <Link href="/#kien-thuc" className="transition hover:text-brass">
                  Kiến thức tử vi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-fg-faint">
              Tài khoản
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
              <li>
                <Link href="/login" className="transition hover:text-brass">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-brass">
                  Tạo tài khoản
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rule-gold" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tử Vi. An sao dựa trên thư viện iztro.</p>
          <p>Công cụ tham khảo văn hoá, không thay thế tư vấn chuyên môn.</p>
        </div>
      </div>
    </footer>
  );
}
