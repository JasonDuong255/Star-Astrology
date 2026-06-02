import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";

const features = [
  {
    title: "An sao tự động",
    desc: "Lập lá số 12 cung đầy đủ chính/phụ tinh, tứ hoá, đại vận — dựa trên thư viện iztro.",
  },
  {
    title: "Tiếng Việt",
    desc: "Toàn bộ tên cung, sao và thuật ngữ hiển thị bằng tiếng Việt.",
  },
  {
    title: "Lưu & quản lý",
    desc: "Đăng nhập để lưu nhiều lá số và xem lại bất cứ lúc nào.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-20 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold/80">
            Tử Vi Đẩu Số
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Lập lá số tử vi <span className="text-gold">miễn phí</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Nhập ngày giờ sinh để an sao và xem lá số 12 cung đầy đủ bằng tiếng
            Việt. Đăng nhập để lưu lại và (sắp ra mắt) luận giải chi tiết.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/charts/new">
              <Button size="lg">Lập lá số ngay</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-4 pb-24 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-gold-soft">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
