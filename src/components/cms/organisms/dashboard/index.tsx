"use client";

import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Clock, PackageCheck, RefreshCw, ShoppingCart, TrendingUp } from "lucide-react";
import ButtonRoot from "../../atoms/button-atom/button-root";
import { cn } from "@/lib/utils";
import { IDashboardData } from "@/types/cms/dashboard";
import { formatNumber } from "@/utils/validate";

const ORDER_STATUS_COLORS = ["#f59e0b", "#2563eb", "#06b6d4", "#16a34a", "#dc2626"];
const PRODUCT_EXPIRY_COLORS = ["#f59e0b", "#16a34a", "#dc2626", "#94a3b8"];

const MOCK_DASHBOARD_DATA: IDashboardData = {
  count_product: 1286,
  count_order: 342,
  count_order_processing: 47,
  total_revenue_recent: 186450000,
  recent_days: 30,
  expiring_soon_days: 30,
  product_expiry: {
    count_product_expiring_soon: 38,
    count_product_valid: 1164,
    count_product_expired: 12,
    count_product_missing_expiry: 72
  },
  order_statuses: [
    { status: 0, label: "Chờ xử lý", count_order: 24 },
    { status: 1, label: "Đã xác nhận", count_order: 31 },
    { status: 2, label: "Đang giao", count_order: 16 },
    { status: 3, label: "Hoàn thành", count_order: 258 },
    { status: 4, label: "Đã hủy", count_order: 13 }
  ],
  top_selling_products: [
    { product_id: 101, product_name: "Panadol Extra 500mg", quantity: 186, total_revenue: 14880000 },
    { product_id: 102, product_name: "Vitamin C DHC 60 viên", quantity: 142, total_revenue: 21300000 },
    { product_id: 103, product_name: "Nước muối sinh lý Natri Clorid 0.9%", quantity: 128, total_revenue: 3840000 },
    { product_id: 104, product_name: "Viên uống bổ mắt Omega 3", quantity: 96, total_revenue: 26880000 },
    { product_id: 105, product_name: "Men vi sinh Enterogermina", quantity: 84, total_revenue: 12600000 },
    { product_id: 106, product_name: "Siro ho Prospan 100ml", quantity: 73, total_revenue: 9490000 },
    { product_id: 107, product_name: "Khẩu trang y tế 4 lớp", quantity: 65, total_revenue: 3250000 }
  ]
};

type DashboardChartItem = {
  name: string;
  value: number;
  color?: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
};

const formatOrderStatusTick = (value: string) => {
  const labels: Record<string, string> = {
    "Chờ xử lý": "Chờ",
    "Đã xác nhận": "Xác nhận",
    "Đang giao": "Giao",
    "Hoàn thành": "Xong",
    "Đã hủy": "Hủy"
  };

  return labels[value] || value;
};

const truncateTick = (value: string, maxLength = 22) => {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};

const ChartCard = ({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

const EmptyChart = ({ text }: { text: string }) => {
  return <div className="flex h-[260px] items-center justify-center text-sm text-slate-500">{text}</div>;
};

const StatCard = ({
  label,
  value,
  note,
  icon: Icon,
  className
}: {
  label: string;
  value: string | number;
  note?: string;
  icon: React.ElementType;
  className?: string;
}) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
          {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", className)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [dashboard] = useState<IDashboardData>(MOCK_DASHBOARD_DATA);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 450);
  };

  const expiryData = useMemo<DashboardChartItem[]>(() => {
    return [
      {
        name: "Sắp hết hạn",
        value: dashboard.product_expiry.count_product_expiring_soon,
        color: PRODUCT_EXPIRY_COLORS[0]
      },
      {
        name: "Còn hạn",
        value: dashboard.product_expiry.count_product_valid,
        color: PRODUCT_EXPIRY_COLORS[1]
      },
      {
        name: "Đã hết hạn",
        value: dashboard.product_expiry.count_product_expired,
        color: PRODUCT_EXPIRY_COLORS[2]
      },
      {
        name: "Chưa có dữ liệu",
        value: dashboard.product_expiry.count_product_missing_expiry,
        color: PRODUCT_EXPIRY_COLORS[3]
      }
    ];
  }, [dashboard]);

  const orderStatusData = useMemo<DashboardChartItem[]>(() => {
    return dashboard.order_statuses.map((item, index) => ({
      name: item.label,
      value: item.count_order,
      color: ORDER_STATUS_COLORS[index] || "#64748b"
    }));
  }, [dashboard]);

  const hasExpiryChartData = expiryData.some((item) => item.value > 0);
  const hasOrderStatusData = orderStatusData.some((item) => item.value > 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 rounded-lg bg-[#1d55db1a] px-5 py-4 text-blue-1d md:flex-row md:items-center">
        <div>
          <h1 className="text-base font-bold">Tổng quan Medicare CMS</h1>
          <p className="mt-1 text-sm text-blue-1d/80">Sản phẩm, đơn hàng và sản phẩm bán chạy gần đây</p>
        </div>
        <ButtonRoot variant="outline" size="small" loading={loading} onClick={handleRefresh}>
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </span>
        </ButtonRoot>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tổng sản phẩm"
          value={formatNumber(dashboard.count_product)}
          note={`${formatNumber(dashboard.product_expiry.count_product_valid)} sản phẩm còn hạn`}
          icon={PackageCheck}
          className="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Sắp hết hạn"
          value={formatNumber(dashboard.product_expiry.count_product_expiring_soon)}
          note={`Trong ${dashboard.expiring_soon_days} ngày tới`}
          icon={Clock}
          className="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Đơn đang xử lý"
          value={formatNumber(dashboard.count_order_processing)}
          note={`${formatNumber(dashboard.count_order)} tổng đơn hàng`}
          icon={ShoppingCart}
          className="bg-cyan-50 text-cyan-600"
        />
        <StatCard
          label="Doanh thu gần đây"
          value={formatCurrency(dashboard.total_revenue_recent)}
          note={`${dashboard.recent_days} ngày gần nhất`}
          icon={TrendingUp}
          className="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard
          title="Tình trạng hạn sản phẩm"
          subtitle={`Tính sản phẩm sắp hết hạn trong ${dashboard.expiring_soon_days} ngày`}
        >
          {hasExpiryChartData ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expiryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {expiryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any, name: any) => [formatNumber(Number(value || 0)), String(name)]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 md:grid-cols-4">
                {expiryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyChart text="Chưa có dữ liệu hạn sử dụng" />
          )}
        </ChartCard>

        <ChartCard title="Đơn hàng theo trạng thái" subtitle="Phân bổ theo trạng thái xử lý đơn hàng">
          {hasOrderStatusData ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} tickFormatter={formatOrderStatusTick} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: any) => [formatNumber(Number(value || 0)), "Đơn hàng"]} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {orderStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChart text="Chưa có đơn hàng" />
          )}
        </ChartCard>
      </div>

      <ChartCard title="Sản phẩm bán chạy gần đây" subtitle={`Top sản phẩm theo số lượng bán trong ${dashboard.recent_days} ngày`}>
        {dashboard.top_selling_products.length ? (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboard.top_selling_products}
                  layout="vertical"
                  margin={{ top: 0, right: 18, left: 12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="product_name"
                    width={150}
                    tick={{ fontSize: 11 }}
                    tickFormatter={truncateTick}
                  />
                  <Tooltip formatter={(value: any) => [formatNumber(Number(value || 0)), "Số lượng"]} />
                  <Bar dataKey="quantity" fill="#2563eb" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-100">
              {dashboard.top_selling_products.map((product, index) => (
                <div
                  key={product.product_id}
                  className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {index + 1}. {product.product_name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{formatCurrency(product.total_revenue)}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-blue-1d">{formatNumber(product.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyChart text="Chưa có dữ liệu bán hàng" />
        )}
      </ChartCard>
    </div>
  );
};

export default DashboardOverview;
