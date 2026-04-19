'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Eye, EyeOff, Lock, Mail, MessageCircle,
  Shield, Users, Bell, Activity,
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

/* ─── Animated chat bubbles floating on the left panel ─── */
const BUBBLES = [
  { text: '👋 Xin chào team!',         delay: '0s',    top: '18%', left: '8%' },
  { text: '📋 Review PR #42 nhé',       delay: '0.8s',  top: '32%', left: '18%' },
  { text: '✅ Done! Merge rồi',          delay: '1.6s',  top: '48%', left: '6%' },
  { text: '🚀 Deploy lên staging thôi', delay: '2.4s',  top: '62%', left: '14%' },
  { text: '☕ Coffee break 5 phút!',     delay: '3.2s',  top: '76%', left: '9%' },
];

const FEATURES = [
  { icon: <Shield size={16} />,   label: 'Bảo mật nội bộ', desc: 'Chỉ nhân viên được duyệt mới truy cập' },
  { icon: <Activity size={16} />, label: 'Realtime',        desc: 'Tin nhắn tức thì, không trễ' },
  { icon: <Users size={16} />,    label: 'Nhóm & Kênh',    desc: 'Tổ chức theo phòng ban, dự án' },
  { icon: <Bell size={16} />,     label: 'Thông báo thông minh', desc: 'Không bỏ lỡ tin nhắn quan trọng' },
];

/* ─── Left hero panel ─── */
function HeroPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[52%] flex-col justify-between p-10 relative overflow-hidden"
      style={{ background: 'var(--theme-primary, #0068FF)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute top-1/2 right-4 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      {/* Top brand */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <MessageCircle size={22} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-none">Hupuna Chat</p>
          <p className="text-white/60 text-xs mt-0.5">Internal Communication Platform</p>
        </div>
      </div>

      {/* Animated chat bubbles */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full relative h-64">
          {BUBBLES.map((b, i) => (
            <div
              key={i}
              className="absolute bg-white/20 backdrop-blur-sm text-white text-sm
                         px-4 py-2 rounded-full border border-white/25 whitespace-nowrap
                         shadow-lg animate-float"
              style={{
                top: b.top,
                left: b.left,
                animationDelay: b.delay,
                animationDuration: '4s',
              }}
            >
              {b.text}
            </div>
          ))}

          {/* Typing indicator */}
          <div
            className="absolute bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl
                       border border-white/25 flex items-center gap-1.5"
            style={{ bottom: '8%', left: '20%', animationDelay: '1s' }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/90">{f.icon}</span>
              <span className="text-white text-xs font-semibold">{f.label}</span>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom company tagline */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/20">
        <p className="text-white/50 text-[11px] text-center">
          🔒 Nền tảng giao tiếp nội bộ — Chỉ dành cho nhân viên được phê duyệt
        </p>
      </div>
    </div>
  );
}

/* ─── Main Login Page ─── */
export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    // Demo error state
    setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-[var(--bg-message-area,#F0F2F5)]">
      <HeroPanel />

      {/* ─── Right panel: Form ─── */}
      <div className="flex-1 flex flex-col relative">
        {/* Nút cài đặt giao diện nổi (Floating) */}
        <div className="absolute top-6 right-8 z-50">
          <ThemeToggle />
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Chào mừng trở lại 👋
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Đăng nhập vào hệ thống nội bộ Hupuna Chat
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 flex items-start gap-3 bg-destructive/10 border border-destructive/20
                              rounded-lg px-4 py-3">
                <span className="text-destructive text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email công ty
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="ten@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background
                               text-sm text-foreground placeholder:text-muted-foreground/60
                               focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                               focus:border-[var(--theme-primary,#0068FF)] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Mật khẩu
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-medium hover:underline"
                    style={{ color: 'var(--theme-primary, #0068FF)' }}
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-background
                               text-sm text-foreground placeholder:text-muted-foreground/60
                               focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0068FF)]/40
                               focus:border-[var(--theme-primary,#0068FF)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground
                               hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 rounded border border-border bg-background
                                  peer-checked:bg-[var(--theme-primary,#0068FF)]
                                  peer-checked:border-[var(--theme-primary,#0068FF)]
                                  transition-colors flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">Ghi nhớ đăng nhập</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl text-sm font-semibold text-white
                           transition-all duration-150 active:scale-[0.98] disabled:opacity-70
                           flex items-center justify-center gap-2 shadow-md"
                style={{ backgroundColor: 'var(--theme-primary, #0068FF)' }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xác thực…
                  </>
                ) : 'Đăng nhập'}
              </button>
            </form>

            {/* Divider & register link */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground px-2">Chưa có tài khoản?</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Link
              href="/register"
              className="flex items-center justify-center h-11 w-full rounded-xl text-sm font-semibold
                         border-2 transition-all duration-150 hover:bg-secondary active:scale-[0.98]"
              style={{
                borderColor: 'var(--theme-primary, #0068FF)',
                color: 'var(--theme-primary, #0068FF)',
              }}
            >
              Yêu cầu tài khoản mới
            </Link>

            {/* Info note */}
            <div className="mt-6 flex gap-2.5 bg-secondary rounded-xl p-4">
              <Shield size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Hệ thống nội bộ.</span>{' '}
                Chỉ nhân viên có tài khoản được phê duyệt bởi <span className="font-medium">Admin/HR</span> mới có thể đăng nhập.
                Liên hệ IT Support nếu cần hỗ trợ.
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8">
              © 2025 Hupuna Chat · Nền tảng giao tiếp nội bộ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
