'use client';

import { useEffect, useState, useRef } from 'react';
import { Moon, Sun, Palette, X } from 'lucide-react';

const COLOR_THEMES = [
  { id: 'blue',   label: 'Zalo Blue',    hex: '#0068FF' },
  { id: 'rose',   label: 'Rose Pink',    hex: '#F43F5E' },
  { id: 'green',  label: 'Emerald',      hex: '#10B981' },
  { id: 'orange', label: 'Sunset',       hex: '#F97316' },
  { id: 'purple', label: 'Purple',       hex: '#8B5CF6' },
] as const;

type ColorTheme = typeof COLOR_THEMES[number]['id'];
type Mode = 'light' | 'dark';

export function ThemeToggle() {
  const [mode, setMode]               = useState<Mode>('light');
  const [colorTheme, setColorTheme]   = useState<ColorTheme>('blue');
  const [mounted, setMounted]         = useState(false);
  const [isOpen, setIsOpen]           = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedMode  = (document.documentElement.getAttribute('data-mode') as Mode) || 'light';
    const savedTheme = (document.documentElement.getAttribute('data-theme') as ColorTheme) || 'blue';
    setMode(savedMode);
    setColorTheme(savedTheme);

    // Close when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function applyTheme(newMode: Mode, newColor: ColorTheme) {
    document.documentElement.setAttribute('data-mode',  newMode);
    document.documentElement.setAttribute('data-theme', newColor);
    localStorage.setItem('chat-mode',  newMode);
    localStorage.setItem('chat-theme', newColor);
  }

  function toggleMode() {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    applyTheme(next, colorTheme);
  }

  function selectColor(id: ColorTheme) {
    setColorTheme(id);
    applyTheme(mode, id);
  }

  if (!mounted) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center 
                   shadow-sm hover:bg-secondary transition-all active:scale-95 text-foreground"
        aria-label="Cài đặt giao diện"
      >
        {isOpen ? <X size={20} /> : <Palette size={20} />}
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 rounded-2xl border border-border bg-card shadow-2xl min-w-[220px] 
                        animate-in fade-in zoom-in duration-200 z-[100] origin-top-right">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                Chế độ hiển thị
              </p>
              <button
                onClick={toggleMode}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                           bg-secondary text-foreground hover:bg-muted transition-colors w-full text-left"
              >
                {mode === 'dark'
                  ? <Sun  size={18} className="text-yellow-400 flex-shrink-0" />
                  : <Moon size={18} className="text-primary    flex-shrink-0" />}
                {mode === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              </button>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                Màu chủ đạo
              </p>
              <div className="flex gap-2.5 px-1">
                {COLOR_THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectColor(t.id)}
                    title={t.label}
                    className="relative w-8 h-8 rounded-full flex items-center justify-center
                               transition-all duration-150 hover:scale-110 active:scale-90 shadow-sm"
                    style={{
                      backgroundColor: t.hex,
                      boxShadow: colorTheme === t.id ? `0 0 0 2px var(--card), 0 0 0 4px ${t.hex}` : 'none',
                    }}
                  >
                    {colorTheme === t.id && (
                      <span className="text-white text-[10px] font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
