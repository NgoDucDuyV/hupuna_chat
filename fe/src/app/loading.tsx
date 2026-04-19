'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      {/* Brand logo pulse effect */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] animate-pulse flex items-center justify-center">
            {/* Hupuna Brand Icon */}
            <div className="w-14 h-14 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-white font-heading font-bold text-3xl select-none">H</span>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-heading font-semibold text-foreground tracking-wide">
          HUPUNA CHAT
        </p>
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-2 animate-pulse">
          Premium Communication Experience
        </p>
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite] origin-left" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); transform: translateX(50%); }
          100% { transform: scaleX(0); transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
