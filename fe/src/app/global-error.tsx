'use client';

import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="antialiased font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
          <div className="flex flex-col items-center text-center max-w-lg">
            <div className="mb-6 p-4 bg-red-100 rounded-full">
              <AlertCircle size={48} className="text-red-500" />
            </div>
            
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
               HUPUNA SYSTEM ERROR
            </h1>
            
            <p className="text-gray-600 mb-10 font-medium">
              Trung tâm dữ liệu Hupuna đang gặp sự cố kết nối tầng cấu trúc.
            </p>

            <button
              onClick={() => reset()}
              className="px-12 py-3 bg-[#fd7e14] text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-orange-200"
            >
              Tái khởi động hệ thống
            </button>

            <div className="mt-12 text-[11px] text-gray-400 bg-gray-50 p-4 rounded border border-gray-100">
               <p>Chi tiết kỹ thuật: {error.message}</p>
               <p className="mt-1">Digest: {error.digest || 'no-digest'}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
