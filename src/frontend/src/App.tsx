import { useEffect, useState } from 'react';

type Health = { status: 'ok'; service: string };

export default function App() {
  const [apiStatus, setApiStatus] = useState('Đang kết nối API…');

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API response was not successful');
        return response.json() as Promise<Health>;
      })
      .then((health) => setApiStatus(`${health.service}: ${health.status}`))
      .catch(() => setApiStatus('API chưa kết nối'));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f6ef] text-[#10251e]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a className="flex items-center gap-3 font-bold tracking-tight" href="/" aria-label="Badmin Booking Hub">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#c8f169] text-xl">B</span>
          <span>Badmin<span className="text-[#729141]">Hub</span></span>
        </a>
        <span className="rounded-full border border-[#d9ded0] px-4 py-2 text-sm font-medium">University project · MVP</span>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
            <span className="size-2 rounded-full bg-[#79a83e]" /> Sân cầu lông, dễ đặt hơn
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Trận đấu hay bắt đầu từ một <span className="text-[#779b45]">khung giờ trống.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#607068]">
            Badmin Booking Hub hướng tới trải nghiệm tìm sân và quản lý lịch đặt gọn gàng cho người chơi lẫn chủ sân.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#10251e] px-6 py-3.5 font-semibold text-white transition hover:bg-[#29483a]" href="#starting-point">Khám phá dự án <span aria-hidden="true">↗</span></a>
            <a className="rounded-full border border-[#cbd2c6] bg-white px-6 py-3.5 font-semibold transition hover:border-[#10251e]" href="https://github.com/Sumonnnnn1144/BadminBookingHub">Mã nguồn GitHub</a>
          </div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-[#78857b]">Starter interface · booking features are being planned</p>
        </div>

        <div className="relative mx-auto w-full max-w-xl" aria-label="Minh họa lịch đặt sân">
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-[#e1efbe] blur-2xl" />
          <div className="relative rounded-[2rem] bg-[#17382b] p-5 text-white shadow-2xl shadow-[#17382b]/15 sm:p-7">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-white/60">Thứ bảy · 18 tháng 10</p><h2 className="mt-1 text-2xl font-semibold">Chọn giờ chơi</h2></div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">Minh họa</span>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {['07:00', '08:30', '10:00', '14:30', '16:00', '19:30'].map((time, index) => (
                <div key={time} className={`rounded-2xl border px-4 py-4 ${index === 2 ? 'border-[#d1f58b] bg-[#d1f58b] text-[#17382b]' : 'border-white/15 bg-white/[0.06]'}`}>
                  <p className="text-lg font-semibold">{time}</p>
                  <p className={`mt-1 text-xs ${index === 2 ? 'text-[#17382b]/65' : 'text-white/55'}`}>{index === 2 ? 'Sân 02 · Đang chọn' : `Sân 0${(index % 3) + 1} · Còn trống`}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/[0.08] p-4">
              <div><p className="text-xs text-white/55">Trạng thái backend</p><p className="mt-1 text-sm font-medium">{apiStatus}</p></div>
              <span className="grid size-10 place-items-center rounded-full bg-[#d1f58b] text-lg text-[#17382b]">✓</span>
            </div>
          </div>
        </div>
      </section>

      <section id="starting-point" className="border-t border-[#e2e6dc] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10">
          {[
            ['01', 'Tìm sân', 'Mục tiêu: hiển thị sân và khung giờ khả dụng.'],
            ['02', 'Đặt lịch', 'Mục tiêu: tạo và theo dõi yêu cầu đặt sân.'],
            ['03', 'Quản lý sân', 'Mục tiêu: hỗ trợ đơn vị vận hành quản lý lịch.'],
          ].map(([number, title, description]) => (
            <article key={number} className="rounded-3xl bg-[#f5f6ef] p-6">
              <p className="text-sm font-bold text-[#779b45]">{number}</p>
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-2 leading-6 text-[#65736a]">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="bg-[#10251e] px-6 py-5 text-center text-sm text-white/60">Badmin Booking Hub · University Software Engineering Project</footer>
    </main>
  );
}
