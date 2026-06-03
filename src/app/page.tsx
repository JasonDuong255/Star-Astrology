import Link from "next/link";
import {
  ArrowRight,
  PencilSimpleLine,
  Compass,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ThienBan from "@/components/brand/ThienBan";

const CUNG = [
  { name: "Mệnh", meaning: "Bản thân, cốt cách", key: true },
  { name: "Phụ Mẫu", meaning: "Cha mẹ, bề trên" },
  { name: "Phúc Đức", meaning: "Phúc phần, an vui" },
  { name: "Điền Trạch", meaning: "Nhà cửa, đất đai" },
  { name: "Quan Lộc", meaning: "Sự nghiệp, công danh" },
  { name: "Nô Bộc", meaning: "Bạn bè, cộng sự" },
  { name: "Thiên Di", meaning: "Đi xa, ngoại cảnh" },
  { name: "Tật Ách", meaning: "Sức khỏe, tai ách" },
  { name: "Tài Bạch", meaning: "Tiền tài, của cải" },
  { name: "Tử Tức", meaning: "Con cái, hậu vận" },
  { name: "Phu Thê", meaning: "Hôn nhân, bạn đời" },
  { name: "Huynh Đệ", meaning: "Anh em, thủ túc" },
];

const STEPS = [
  {
    n: "01",
    icon: PencilSimpleLine,
    title: "Nhập ngày giờ sinh",
    desc: "Họ tên, giới tính, ngày sinh dương hoặc âm lịch, và canh giờ.",
  },
  {
    n: "02",
    icon: Compass,
    title: "An sao tự động",
    desc: "Hệ thống định cục, an chính tinh, phụ tinh và tứ hoá lên 12 cung.",
  },
  {
    n: "03",
    icon: BookOpen,
    title: "Đọc và lưu lá số",
    desc: "Xem lá số trực quan, nắm mệnh cục, can chi; đăng nhập để lưu lại.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO — split bất đối xứng */}
        <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 pb-16 pt-16 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
          <div className="animate-fade-up">
            <p className="eyebrow">Tử Vi Đẩu Số</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-fg md:text-5xl lg:text-6xl">
              Lập lá số tử vi
              <br />
              chính xác,{" "}
              <span className="italic text-brass">trực quan</span> và dễ hiểu.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
              Nhập ngày giờ sinh, hệ thống an sao và dựng lá số 12 cung sáng rõ,
              giải nghĩa từng cung.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/charts/new"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-cta px-7 text-base font-medium text-cta-ink shadow-[0_14px_34px_-14px_var(--color-cta)] transition hover:bg-cta-soft active:translate-y-px"
              >
                Lập lá số ngay
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                href="#kien-thuc"
                className="inline-flex h-12 items-center rounded-xl border border-line-strong px-6 text-base text-fg transition hover:border-brass/50 hover:bg-surface"
              >
                Tìm hiểu tử vi
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <ThienBan className="h-auto w-full animate-fade-in [animation-delay:200ms]" />
          </div>
        </section>

        {/* MƯỜI HAI CUNG — bảng thiên bàn (almanac) */}
        <section
          id="kien-thuc"
          className="mx-auto max-w-[1180px] scroll-mt-20 px-5 py-20"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">Mười hai cung</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-fg md:text-[2.6rem]">
              Mười hai cung an định một đời người
            </h2>
            <p className="mt-4 max-w-xl text-fg-muted">
              Mỗi cung soi một lĩnh vực của cuộc đời. Cung Mệnh là gốc, các cung
              còn lại bổ trợ và đối chiếu quanh nó.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {CUNG.map((c) => (
                <div
                  key={c.name}
                  className={`group relative border-b border-r border-line p-5 transition-colors last:border-r-0 hover:bg-surface ${
                    c.key ? "bg-surface" : ""
                  }`}
                >
                  {c.key ? (
                    <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-cinnabar" />
                  ) : null}
                  <h3
                    className={`font-serif text-xl ${c.key ? "text-cinnabar" : "text-fg"}`}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-fg-faint">{c.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÁCH LẬP — dòng chảy đánh số */}
        <section className="mx-auto max-w-[1180px] px-5 py-12">
          <h2 className="font-serif text-3xl font-semibold text-fg md:text-[2.6rem]">
            Ba bước đến lá số của bạn
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="bg-bg p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl text-brass/70">
                      {s.n}
                    </span>
                    <Icon size={26} weight="duotone" className="text-brass" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA cuối */}
        <section className="mx-auto max-w-[1180px] px-5 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-8 py-16 text-center">
            <ThienBan className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-20" />
            <h2 className="relative font-serif text-3xl font-semibold text-fg md:text-4xl">
              Lá số của bạn đang chờ được dựng
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-fg-muted">
              Miễn phí, không cần đăng nhập để xem. Đăng nhập khi muốn lưu lại.
            </p>
            <Link
              href="/charts/new"
              className="relative mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-cta px-7 text-base font-medium text-cta-ink shadow-[0_14px_34px_-14px_var(--color-cta)] transition hover:bg-cta-soft active:translate-y-px"
            >
              Lập lá số ngay
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
