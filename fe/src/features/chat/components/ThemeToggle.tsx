'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const COLOR_THEMES = [
  { id: 'blue',   label: 'Zalo Blue',  hex: '#0068FF' },
  { id: 'rose',   label: 'Rose Pink',  hex: '#F43F5E' },
  { id: 'green',  label: 'Emerald',    hex: '#10B981' },
  { id: 'orange', label: 'Sunset',     hex: '#F97316' },
  { id: 'purple', label: 'Purple',     hex: '#8B5CF6' },
] as const

type ColorTheme = (typeof COLOR_THEMES)[number]['id']
type Mode = 'light' | 'dark'

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue')

  useEffect(() => {
    const savedMode  = (localStorage.getItem('chat-mode')  as Mode)       || 'light'
    const savedTheme = (localStorage.getItem('chat-theme') as ColorTheme) || 'blue'
    applyTheme(savedMode, savedTheme)
    setMode(savedMode)
    setColorTheme(savedTheme)
  }, [])

  function applyTheme(newMode: Mode, newColor: ColorTheme) {
    const root = document.documentElement
    root.setAttribute('data-mode',  newMode)
    root.setAttribute('data-theme', newColor)
    localStorage.setItem('chat-mode',  newMode)
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
    <div className="p-3 flex flex-col gap-3 bg-popover rounded-xl">
      {/* Dark/Light Toggle */}
      <button
        id="theme-mode-toggle"
        onClick={toggleMode}
        className="
          flex items-center gap-2 w-full px-3 py-2 rounded-lg
          bg-muted hover:bg-border
          text-foreground text-sm font-medium
          transition-colors duration-150
        "
      >
        {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        <span>{mode === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}</span>
      </button>

      {/* Color Theme Picker */}
      <div>
        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-1">
          Màu chủ đạo
        </p>
        <div className="flex gap-2 flex-wrap px-1">
          {COLOR_THEMES.map((t) => (
            <button
              key={t.id}
              id={`theme-color-${t.id}`}
              onClick={() => selectColor(t.id)}
              title={t.label}
              aria-label={t.label}
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center',
                'border-2 transition-all duration-150',
                'hover:scale-110',
                colorTheme === t.id
                  ? 'border-foreground scale-110'
                  : 'border-transparent'
              )}
              style={{ backgroundColor: t.hex }}
            >
              {colorTheme === t.id && (
                <span className="text-white text-[10px] font-bold leading-none">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
