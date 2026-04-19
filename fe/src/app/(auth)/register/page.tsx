'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Eye, EyeOff, Lock, Mail, MessageCircle,
  User, Building2, Phone, Shield, CheckCircle2, Clock,
  Users, Activity, Bell,
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

/* ─── STEPS indicator ─── */
const STEPS = ['Thông tin cá nhân', 'Tài khoản', 'Hoàn thành'];

/* ─── Left hero panel (reused) ─── */
const FEATURES = [
  { icon: <Shield size={15} />,   label: 'Bảo mật tuyệt đối',    desc: 'Dữ liệu mã hóa end-to-end' },
  { icon: <Users size={15} />,    label: 'Nhóm & Phòng ban',      desc: 'Tổ chức rõ ràng theo cấu trúc' },
  { icon: <Activity size={15} />, label: 'Realtime tức thì',      desc: 'Tin nhắn đến ngay lập tức' },
  { icon: <Bell size={15} />,     label: 'Thông báo thông minh',  desc: 'Không bỏ lỡ điều quan trọng' },
];

function HeroPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[52%] flex-col justify-between p-10 relative overflow-hidden"
      style={{ background: 'var(--theme-primary, #0068FF)' }}
    >
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <MessageCircle size={22} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-none">Hupuna Chat</p>
          <p className="text-white/60 text-xs mt-0.5">Internal Communication Platform</p>
        </div>
      </div>

      {/* Center illustration */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 py-8">
        {/* Approval flow visual */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/25 w-full text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <p className="text-white font-semibold text-sm">Nhân viên mới</p>
            <p className="text-white/60 text-xs mt-1">Gửi yêu cầu tài khoản</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-0.5 h-6 bg-white/30 rounded-full" />
            <div className="w-6 h-6 rounded-full bg-yellow-400/80 flex items-center justify-center">
              <Clock size={12} className="text-white" />
            </div>
            <div className="w-0.5 h-6 bg-white/30 rounded-full" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/25 w-full text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Shield size={28} className="text-white" />
            </div>
            <p className="text-white font-semibold text-sm">Admin / HR</p>
            <p className="text-white/60 text-xs mt-1">Xét duyệt & cấp quyền truy cập</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-0.5 h-6 bg-white/30 rounded-full" />
            <div className="w-6 h-6 rounded-full bg-green-400/80 flex items-center justify-center">
              <CheckCircle2 size={12} className="text-white" />
            </div>
            <div className="w-0.5 h-6 bg-white/30 rounded-full" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/25 w-full text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
              <MessageCircle size={28} className="text-white" />
            </div>
            <p className="text-white font-semibold text-sm">Hupuna Chat</p>
            <p className="text-white/60 text-xs mt-1">Truy cập toàn bộ tính năng</p>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5">
        {FEATURES.map((f, i) => (
          <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/90">{f.icon}</span>
              <span className="text-white text-xs font-semibold">{f.label}</span>
            </div>
            <p className="text-white/55 text-[10px] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-5 pt-4 border-t border-white/20">
        <p className="text-white/45 text-[11px] text-center">
          🔒 Hệ thống nội bộ — Tài khoản cần được Admin phê duyệt
        </p>
      </div>
    </div>
  );
}

/* ─── Main Register Page ─── */
export default function RegisterPage() {
  const [step,        setStep]        = useState(0);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  const [form, setForm] = useState({
    fullName:   '',
    department: '',
    phone:      '',
    email:      '',
    password:   '',
    confirm:    '',
    reason:     '',
  });

  const passwordMatch = form.confirm === '' || form.password === form.confirm;

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (step < 1) { setStep(step + 1); return; }
    if (!passwordMatch) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  }

  /* ─── Success state ─── */
  if (submitted) {
    return (
      <div className="min-h-screen flex overflow-hidden bg-[var(--bg-message-area,#F0F2F5)]">
        <HeroPanel />
        <div className="flex-1 flex flex-col relative">
          <div className="absolute top-6 right-8 z-50">
            <ThemeToggle />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
            <div className="w-full max-w-md text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--theme-primary, #0068FF)' }}
              >
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Yêu cầu đã gửi!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Tài khoản của bạn đang chờ <strong className="text-foreground">Admin / HR</strong> xét duyệt.
                Bạn sẽ nhận email thông báo khi tài khoản được kích hoạt.
              </p>

              <div className="bg-secondary rounded-2xl p-5 border border-border text-left mb-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                  Thông tin đã gửi
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Họ tên</span>
                    <span className="text-foreground text-sm font-medium">{form.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Email</span>
                    <span className="text-foreground text-sm font-medium">{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Phòng ban</span>
                    <span className="text-foreground text-sm font-medium">{form.department}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20
                              border border-yellow-200 dark:border-yellow-800/40 rounded-xl p-4 mb-6">
                <Clock size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                  Thời gian xét duyệt thường là <strong>1-2 ngày làm việc</strong>.
                  Liên hệ IT Support nếu cấp bách: <span className="font-medium">it@hupuna.com</span>
                </p>
              </div>

              <Link
                href="/login"
                className="flex items-center justify-center h-11 w-full rounded-xl text-sm font-semibold
                           text-white transition-all active:scale-[0.98] shadow-md"
                style={{ backgroundColor: 'var(--theme-primary, #0068FF)' }}
              >
                Về trang đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-[var(--bg-message-area,#F0F2F5)]">
      <HeroPanel />

      {/* ─── Right panel ─── */}
      <div className="flex-1 flex flex-col relative">
        {/* Nút cài đặt giao diện nổi (Floating) */}
        <div className="absolute top-6 right-8 z-50">
          <ThemeToggle />
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-8 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Yêu cầu tài khoản 📬
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Điền thông tin để gửi yêu cầu tới Admin / HR phê duyệt
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-7">
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                               transition-all duration-300"
                    style={{
                      backgroundColor: i <= step
                        ? 'var(--theme-primary, #0068FF)'
                        : 'var(--border, #E5E7EB)',
                      color: i <= step ? 'white' : 'var(--muted-foreground)',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium text-center leading-tight
                    ${i <= step ? 'text-[var(--theme-primary,#0068FF)]' : 'text-muted-foreground'}`}>
                    {s}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
              {/* Connecting lines */}
            </div>

            <form onSubmit={handleNext} className="flex flex-col gap-4">
              {/* ── Step 0: Personal Info ── */}
              {step === 0 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                      Họ và tên <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="fullName" type="text" required
                        placeholder="Nguyễn Văn An"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background
                                   text-sm text-foreground placeholder:text-muted-foreground/60
                                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                   focus:border-[var(--theme-primary,#0068FF)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="department" className="text-sm font-semibold text-foreground">
                      Phòng ban / Vị trí <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id="department" required
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background
                                   text-sm text-foreground appearance-none
                                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                   focus:border-[var(--theme-primary,#0068FF)] transition-all"
                      >
                        <option value="">-- Chọn phòng ban --</option>
                        <option>Kỹ thuật / Development</option>
                        <option>Thiết kế / Design</option>
                        <option>Marketing</option>
                        <option>Kinh doanh / Sales</option>
                        <option>Nhân sự / HR</option>
                        <option>Kế toán / Finance</option>
                        <option>Vận hành / Operations</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="phone" type="tel"
                        placeholder="0901 234 567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background
                                   text-sm text-foreground placeholder:text-muted-foreground/60
                                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                   focus:border-[var(--theme-primary,#0068FF)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reason" className="text-sm font-semibold text-foreground">
                      Lý do cần tài khoản
                    </label>
                    <textarea
                      id="reason" rows={3}
                      placeholder="Mô tả ngắn gọn tại sao bạn cần truy cập Hupuna Chat…"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background resize-none
                                 text-sm text-foreground placeholder:text-muted-foreground/60
                                 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                 focus:border-[var(--theme-primary,#0068FF)] transition-all"
                    />
                  </div>
                </>
              )}

              {/* ── Step 1: Account ── */}
              {step === 1 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email công ty <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email" type="email" required
                        placeholder="ten@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background
                                   text-sm text-foreground placeholder:text-muted-foreground/60
                                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                   focus:border-[var(--theme-primary,#0068FF)] transition-all"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Dùng email công ty để được xác thực nhanh hơn</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Mật khẩu <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="password" type={showPass ? 'text' : 'password'} required minLength={8}
                        placeholder="Tối thiểu 8 ký tự"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-background
                                   text-sm text-foreground placeholder:text-muted-foreground/60
                                   focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                                   focus:border-[var(--theme-primary,#0068FF)] transition-all"
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Password strength */}
                    {form.password && (
                      <div className="flex gap-1.5 mt-1">
                        {[1,2,3,4].map((l) => (
                          <div key={l} className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: form.password.length >= l * 2
                                ? l <= 1 ? '#EF4444' : l <= 2 ? '#F97316' : l <= 3 ? '#EAB308' : '#22C55E'
                                : 'var(--border)',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirm" className="text-sm font-semibold text-foreground">
                      Xác nhận mật khẩu <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="confirm" type={showConfirm ? 'text' : 'password'} required
                        placeholder="Nhập lại mật khẩu"
                        value={form.confirm}
                        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                        className={`w-full h-11 pl-10 pr-11 rounded-xl border bg-background text-sm
                                    text-foreground placeholder:text-muted-foreground/60
                                    focus:outline-none focus:ring-2 transition-all
                                    ${!passwordMatch ? 'border-destructive focus:ring-destructive/40' : 'border-border focus:ring-[var(--theme-primary,#0068FF)]/40 focus:border-[var(--theme-primary,#0068FF)]'}`}
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {!passwordMatch && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <span>✕</span> Mật khẩu không khớp
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-0.5 accent-[var(--theme-primary,#0068FF)]" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Tôi đồng ý với{' '}
                      <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>Điều khoản sử dụng</span>
                      {' '}và{' '}
                      <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>Quy định bảo mật nội bộ</span>
                      {' '}của công ty.
                    </p>
                  </label>
                </>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 mt-2">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 h-11 rounded-xl text-sm font-semibold border-2 border-border
                               text-muted-foreground hover:bg-secondary transition-all"
                  >
                    ← Quay lại
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || (step === 1 && !passwordMatch)}
                  className="flex-1 h-11 rounded-xl text-sm font-semibold text-white
                             transition-all duration-150 active:scale-[0.98] disabled:opacity-70
                             flex items-center justify-center gap-2 shadow-md"
                  style={{ backgroundColor: 'var(--theme-primary, #0068FF)' }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi…
                    </>
                  ) : step === 0 ? 'Tiếp theo →' : 'Gửi yêu cầu'}
                </button>
              </div>
            </form>

            {/* Login link */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">Đã có tài khoản?</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center h-11 w-full rounded-xl text-sm font-semibold
                         border-2 transition-all hover:bg-secondary active:scale-[0.98]"
              style={{ borderColor: 'var(--theme-primary, #0068FF)', color: 'var(--theme-primary, #0068FF)' }}
            >
              Đăng nhập
            </Link>

            <p className="text-center text-xs text-muted-foreground mt-6">
              © 2025 Hupuna Chat · Nền tảng giao tiếp nội bộ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
