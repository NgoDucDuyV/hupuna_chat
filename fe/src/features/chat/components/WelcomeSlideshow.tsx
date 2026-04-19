'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Slides Data ────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    title: 'Giao diện Dark Mode',
    description: 'Thư giãn và bảo vệ mắt với chế độ giao diện tối mới trên Hupuna Chat.',
    image: '/welcome/welcome-dark.png',
    buttonText: 'Thử ngay',
    highlight: 'giao diện tối'
  },
  {
    id: 2,
    title: 'HUPUNA Business',
    description: 'Nâng cấp trải nghiệm giao tiếp doanh nghiệp với các tính năng quản lý ưu việt.',
    image: '/welcome/welcome-business.png',
    buttonText: 'Nâng cấp ngay',
    highlight: 'Business'
  },
  {
    id: 3,
    title: 'Tin nhắn tự động',
    description: 'Tiết kiệm thời gian với hệ thống trả lời tin nhắn tự động thông minh.',
    image: '/welcome/welcome-auto-msg.png',
    buttonText: 'Tìm hiểu thêm',
    highlight: 'tự động'
  },
  {
    id: 4,
    title: 'Lưu trữ & Chia sẻ file',
    description: 'Đồng bộ dữ liệu Cloud và chia sẻ file dung lượng lớn nhanh chóng.',
    image: '/welcome/welcome-cloud.png',
    buttonText: 'Bắt đầu ngay',
    highlight: 'Cloud'
  },
  {
    id: 5,
    title: 'Quản lý file chuyên nghiệp',
    description: 'Sắp xếp hồ sơ và tài liệu của bạn một cách khoa học, dễ tìm kiếm.',
    image: '/welcome/welcome-file.png',
    buttonText: 'Khám phá ngay',
    highlight: 'chuyên nghiệp'
  }
]

export function WelcomeSlideshow() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrent((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length)
  }

  const slide = SLIDES[current]

  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-background py-10 px-6 overflow-hidden select-none">
      
      {/* ── Top Header ────────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-[26px] font-heading font-medium text-foreground tracking-tight">
          Chào mừng đến với <span className="font-bold">HUPUNA Chat!</span>
        </h1>
        <p className="max-w-xl text-[14.5px] text-muted-foreground font-medium leading-relaxed opacity-80">
          Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng<br /> 
          bạn bè, đồng nghiệp được tối ưu hoá cho máy tính của bạn.
        </p>
      </motion.div>

      {/* ── Main content area ─────────────────────────────────── */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-6 group">
        
        {/* Nav Buttons (Chỉ hiện khi hover hoặc trên mobile) */}
        <button 
          onClick={() => paginate(-1)}
          className="absolute left-[-20px] md:left-0 z-20 p-3 text-primary/40 hover:text-primary transition-all active:scale-95 outline-none"
        >
          <ChevronLeft size={42} strokeWidth={1} />
        </button>
        
        <button 
          onClick={() => paginate(1)}
          className="absolute right-[-20px] md:right-0 z-20 p-3 text-primary/40 hover:text-primary transition-all active:scale-95 outline-none"
        >
          <ChevronRight size={42} strokeWidth={1} />
        </button>

        {/* Animated Slide */}
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center w-full"
            >
              {/* Image with beautiful shadow */}
              <div className="relative w-[320px] md:w-[480px] aspect-video rounded-xl overflow-hidden mb-8">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating decor (như icon trăng trong ảnh mẫu) */}
                {current === 0 && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20"
                  >
                     <div className="text-2xl text-yellow-200">🌙</div>
                  </motion.div>
                )}
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3 px-6 pb-2">
                <h2 className="text-[18px] font-bold text-primary">
                  {slide.title}
                </h2>
                <p className="text-[14px] text-muted-foreground max-w-lg mx-auto font-medium leading-relaxed">
                  {slide.description.split(slide.highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="font-bold text-foreground">{slide.highlight}</span>}
                    </React.Fragment>
                  ))}
                </p>
                
                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <button className="px-8 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[14px] rounded-md transition-all active:scale-95">
                    {slide.buttonText}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pagination Dots ───────────────────────────────────── */}
      <div className="flex items-center gap-2 pb-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1)
              setCurrent(idx)
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-500',
              current === idx 
                ? 'bg-primary scale-125 px-1.5' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
