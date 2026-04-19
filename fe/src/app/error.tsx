'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi để track (đối với backend junior log là quan trọng)
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-red-500" />
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-3">Đã xảy ra sự cố!</h2>
        <p className="text-muted-foreground mb-10 font-medium">
          Hệ thống Hupuna gặp lỗi kỹ thuật khi xử lý dữ liệu. 
          Đội ngũ kỹ thuật đã được thông báo để xử lý.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <RefreshCw size={18} />
            Thử lại
          </button>
          
          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-muted text-foreground font-bold rounded-2xl hover:bg-border transition-all"
          >
            <Home size={18} />
            Về trang chủ
          </Link>
        </div>
      </div>

      <div className="mt-12 p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-[10px] font-mono text-muted-foreground break-all">
              Error ID: {error.digest || 'system-runtime-error'}
          </p>
      </div>
    </div>
  );
}
