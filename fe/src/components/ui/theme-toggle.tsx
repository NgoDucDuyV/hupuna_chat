'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const COLOR_THEMES = [
  { id: 'blue',   label: 'Zalo Blue',  hex: '#0068FF' },
  { id: 'rose',   label: 'Rose Pink',  hex: '#F43F5E' },
  { id: 'green',  label: 'Emerald',    hex: '#10B981' },
  { id: 'orange', label: 'Sunset',     hex: '#F97316' },
  { id: 'purple', label: 'Purple',     hex: '#8B5CF6' },
] as const

type ColorTheme = typeof COLOR_THEMES[number]['id']
type Mode = 'light' | 'dark'

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue')

  useEffect(() => {
    const savedMode  = (localStorage.getItem('chat-mode') as Mode) || 'light'
    const savedTheme = (localStorage.getItem('chat-theme') as ColorTheme) || 'blue'
    applyTheme(savedMode, savedTheme)
    setMode(savedMode)
    setColorTheme(savedTheme)
  }, [])

  function applyTheme(newMode: Mode, newColor: ColorTheme) {
    const root = document.documentElement
    root.setAttribute('data-mode', newMode)
    root.setAttribute('data-theme', newColor)
    localStorage.setItem('chat-mode', newMode)
    localStorage.setItem('chat-theme', newColor)
  }

  function toggleMode() {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    applyTheme(newMode, colorTheme)
  }

  function selectColor(id: ColorTheme) {
    setColorTheme(id)
    applyTheme(mode, id)
  }

  return (
    <div className="p-3 flex flex-col gap-2.5 bg-[var(--bg-list)] rounded-xl border border-[var(--border)] min-w-[200px] z-50">
      {/* Dark/Light Toggle */}
      <button 
        onClick={toggleMode} 
        className="flex items-center gap-2 px-3 py-2 rounded-lg border-none bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer text-sm font-medium transition-colors hover:bg-[var(--border)] w-full" 
        aria-label="Toggle dark mode"
      >
        {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        <span>{mode === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}</span>
      </button>

      {/* Color Theme Picker */}
      <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider m-0 mt-2">Màu chủ đạo</p>
      <div className="flex gap-2 flex-wrap">
        {COLOR_THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => selectColor(t.id)}
            title={t.label}
            className={`w-7 h-7 rounded-full cursor-pointer flex items-center justify-center transition-transform duration-150 relative
              ${colorTheme === t.id ? 'border-[3px] border-[var(--text-primary)] scale-110' : 'border-[3px] border-transparent hover:scale-115'}
            `}
            style={{ backgroundColor: t.hex }}
            aria-label={t.label}
          >
            {colorTheme === t.id && <span className="text-white text-[10px] font-bold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
