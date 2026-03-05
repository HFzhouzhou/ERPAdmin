// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { LayoutDashboard, DollarSign, Package, Factory, Users, ChevronLeft, ChevronRight, Settings, Bell } from 'lucide-react';

export function Sidebar({
  currentPage,
  onPageChange,
  collapsed,
  onToggle
}) {
  const menuItems = [{
    id: 'home',
    label: '仪表盘',
    icon: LayoutDashboard
  }, {
    id: 'finance',
    label: '财务管理',
    icon: DollarSign
  }, {
    id: 'supply-chain',
    label: '供应链',
    icon: Package
  }, {
    id: 'production',
    label: '生产管理',
    icon: Factory
  }, {
    id: 'hr',
    label: '人力资源',
    icon: Users
  }];
  return <div className={`
        bg-[#0F172A] text-white h-screen flex flex-col transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}>
      {/* Logo区域 */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg flex items-center justify-center">
            <span className="text-[#0F172A] font-bold text-xl">E</span>
          </div>
          {!collapsed && <div>
              <h1 className="font-['Playfair_Display'] font-bold text-lg">ERP系统</h1>
              <p className="text-xs text-slate-400 font-['Space_Grotesk']">企业管理平台</p>
            </div>}
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return <li key={item.id}>
                <button onClick={() => onPageChange(item.id)} className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0F172A] font-medium' : 'text-slate-300 hover:bg-slate-800'}
                  `}>
                  <Icon size={20} />
                  {!collapsed && <span className="font-['Space_Grotesk']">{item.label}</span>}
                </button>
              </li>;
        })}
        </ul>
      </nav>

      {/* 底部操作 */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <button onClick={onToggle} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          {!collapsed && <button className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Settings size={18} />
              <span className="text-sm font-['Space_Grotesk']">设置</span>
            </button>}
        </div>
      </div>
    </div>;
}
export function Header({
  title,
  notifications
}) {
  return <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0F172A]">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
          <Bell size={20} className="text-[#0F172A]" />
          {notifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-[#0F172A] text-xs font-bold rounded-full flex items-center justify-center">
              {notifications}
            </span>}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center">
            <span className="text-[#0F172A] font-bold">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#0F172A] font-['Space_Grotesk']">Admin User</p>
            <p className="text-xs text-slate-500 font-['Space_Grotesk']">超级管理员</p>
          </div>
        </div>
      </div>
    </header>;
}