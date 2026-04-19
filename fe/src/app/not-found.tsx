import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
        <Search size={48} className="text-muted-foreground animate-bounce" strokeWidth={1.5} />
      </div>

      <h1 className="text-6xl font-heading font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">Trang không tồn tại</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8 font-medium">
        Hệ thống không tìm thấy nội dung bạn yêu cầu. 
        Vui lòng kiểm tra lại đường dẫn hoặc quay về dashboard.
      </p>

      <Link 
        href="/chat"
        className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
      >
        Quay lại Hupuna Chat
      </Link>
      
      <p className="mt-16 text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-semibold">
        Hupuna Enterprise Ecosystem
      </p>
    </div>
  );
}
