'use client';

import {
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
  SlidersHorizontal,
  Download,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* ─── Mock Data ─────────────────────────────────────────────── */
const MOCK_PENDING = [
  { id: 1, name: 'Nguyễn Văn An',    email: 'van.an@hupuna.com',    phone: '0901 234 567', time: '10 phút trước', otpVerified: true  },
  { id: 2, name: 'Trần Thị Bình',   email: 'thi.binh@hupuna.com',  phone: '0987 654 321', time: '1 giờ trước',   otpVerified: true  },
  { id: 3, name: 'Lê Hoàng Cường',  email: 'hoang.cuong@hupuna.com',phone: '0912 345 678', time: '3 giờ trước',   otpVerified: false },
];

const MOCK_ACTIVE = [
  { id: 10, name: 'Phạm Minh Đức',  email: 'minh.duc@hupuna.com',  phone: '0933 111 222', dept:'Kỹ thuật',  role:'Developer',   online: true  },
  { id: 11, name: 'Hoàng Thị Emm',  email: 'thi.emm@hupuna.com',   phone: '0944 333 444', dept:'Nhân sự',   role:'HR Manager',  online: false },
  { id: 12, name: 'Vũ Quốc Phong',  email: 'quoc.phong@hupuna.com', phone: '0955 555 666', dept:'Marketing', role:'Designer',    online: true  },
];

/* ─── Shared Avatar ──────────────────────────────────────────── */
const AVATAR_COLORS = [
  'from-blue-500 to-blue-600',
  'from-violet-500 to-violet-600',
  'from-emerald-500 to-emerald-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
];

function UserAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const initials = name.split(' ').slice(-2).map((w) => w[0]).join('').toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const sz = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
  return (
    <div className={`${sz} shrink-0 rounded-full bg-gradient-to-br ${color} flex items-center justify-center font-semibold text-white shadow-sm`}>
      {initials}
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({
  label, value, sub, icon: Icon, iconClass, trend,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; iconClass: string; trend?: string;
}) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-sm bg-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground leading-none">{value}</p>
            <p className="text-xs text-muted-foreground mt-2">{sub}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6 min-h-full">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Nhân sự</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Kiểm duyệt đăng ký, phân quyền truy cập nội bộ.</p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Chờ duyệt"
          value={3}
          sub="Nhân sự mới chờ kích hoạt"
          icon={Clock}
          iconClass="bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
          trend="+2 so với hôm qua"
        />
        <StatCard
          label="Đang hoạt động"
          value={142}
          sub="Nhân sự được cấp quyền"
          icon={UserCheck}
          iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
          trend="+5 trong tuần này"
        />
        <StatCard
          label="Bị vô hiệu hóa"
          value={7}
          sub="Tài khoản đã đóng băng"
          icon={UserX}
          iconClass="bg-red-100 text-red-500 dark:bg-red-950/60 dark:text-red-400"
        />
      </div>

      {/* Main Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden flex-1">

        {/* Card Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Tìm theo tên, email..."
                className="pl-9 h-9 w-60 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Bộ lọc
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Tổng 152 nhân viên</span>
          </div>
        </div>

        <Tabs defaultValue="pending">
          {/* Tabs Bar */}
          <div className="px-6 border-b">
            <TabsList className="h-auto rounded-none bg-transparent p-0 gap-6">
              {[
                { value: 'pending', label: 'Chờ duyệt', count: 3 },
                { value: 'active',  label: 'Đang hoạt động', count: 142 },
                { value: 'disabled', label: 'Đã khóa', count: 7 },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative rounded-none border-0 bg-transparent py-3 px-0 text-sm font-medium text-muted-foreground shadow-none transition-colors
                    data-[state=active]:text-foreground data-[state=active]:shadow-none
                    data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:rounded-t-full
                    gap-2"
                >
                  {tab.label}
                  <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground min-w-[20px]">
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* PENDING TAB */}
          <TabsContent value="pending" className="mt-0">
            {/* Banner */}
            <div className="mx-6 mt-4 mb-2 flex items-start gap-3 rounded-lg border border-blue-200/60 bg-blue-50/60 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/20">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                <strong>Quy trình:</strong> Đăng ký Email/SĐT → Xác thực OTP → <strong>Admin phê duyệt</strong> → Đăng nhập được.
                Chỉ phê duyệt sau khi đã đối chiếu thông tin nhân sự.
              </p>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-y bg-muted/30">
                  <th className="px-6 py-3 text-left">Nhân viên</th>
                  <th className="px-6 py-3 text-left">Liên hệ</th>
                  <th className="px-6 py-3 text-left">Đăng ký</th>
                  <th className="px-6 py-3 text-left">OTP</th>
                  <th className="px-6 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PENDING.map((user, i) => (
                  <tr key={user.id} className={`group transition-colors hover:bg-muted/30 ${i < MOCK_PENDING.length - 1 ? 'border-b border-border/60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} />
                        <div>
                          <p className="font-semibold text-sm leading-tight">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Chưa phân công</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 opacity-60" />{user.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 opacity-60" />{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 opacity-60" />{user.time}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.otpVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Đã xác thực
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>Chờ OTP
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          className="h-7 gap-1.5 text-xs px-3"
                          disabled={!user.otpVerified}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Phê duyệt
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 gap-1.5 text-xs px-3 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Từ chối
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem>Gán Phòng ban</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">Xóa yêu cầu</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          {/* ACTIVE TAB */}
          <TabsContent value="active" className="mt-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-y bg-muted/30">
                  <th className="px-6 py-3 text-left">Nhân viên</th>
                  <th className="px-6 py-3 text-left">Liên hệ</th>
                  <th className="px-6 py-3 text-left">Phòng ban</th>
                  <th className="px-6 py-3 text-left">Chức vụ</th>
                  <th className="px-6 py-3 text-left">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ACTIVE.map((user, i) => (
                  <tr key={user.id} className={`group transition-colors hover:bg-muted/30 ${i < MOCK_ACTIVE.length - 1 ? 'border-b border-border/60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <UserAvatar name={user.name} />
                          {user.online && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-tight">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{user.online ? 'Đang online' : 'Offline'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 opacity-60" />{user.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 opacity-60" />{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.dept}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="text-xs font-medium">{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem className="gap-2"><ArrowUpRight className="h-3.5 w-3.5"/>Xem hồ sơ</DropdownMenuItem>
                          <DropdownMenuItem>Đổi Phòng ban</DropdownMenuItem>
                          <DropdownMenuItem>Đổi Chức vụ</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Vô hiệu hóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination strip */}
            <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/10 text-xs text-muted-foreground">
              <span>Hiển thị 3 / 142 nhân viên</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled>← Trước</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">Sau →</Button>
              </div>
            </div>
          </TabsContent>

          {/* DISABLED TAB */}
          <TabsContent value="disabled" className="mt-0">
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <UserX className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">Không có tài khoản bị vô hiệu hóa</p>
                <p className="text-xs text-muted-foreground mt-1">Danh sách này sẽ hiển thị nhân sự đã nghỉ việc hoặc bị khóa.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
