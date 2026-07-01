"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    name: "Purchase",
    href: "/dashboard/purchase",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: FileText,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        SmartERP
      </h1>

      <div className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
            >
              <Icon size={20} />
              {menu.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}