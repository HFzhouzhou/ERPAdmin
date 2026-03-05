// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { TrendingUp, TrendingDown, DollarSign, Package, Factory, Users, ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

import { Sidebar, Header } from '@/components/Sidebar';
export default function Home({
  $w
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [notifications, setNotifications] = useState(5);

  // 模拟数据
  const stats = [{
    title: '本月收入',
    value: '¥2,847,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600'
  }, {
    title: '采购订单',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    color: 'text-blue-600'
  }, {
    title: '生产任务',
    value: '89',
    change: '-3.1%',
    trend: 'down',
    icon: Factory,
    color: 'text-amber-600'
  }, {
    title: '员工总数',
    value: '1,248',
    change: '+2.4%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600'
  }];
  const pendingTasks = [{
    id: 1,
    title: '报销审批',
    department: '财务部',
    applicant: '张三',
    amount: '¥3,500',
    status: 'pending',
    time: '2小时前'
  }, {
    id: 2,
    title: '采购申请',
    department: '采购部',
    applicant: '李四',
    amount: '¥12,800',
    status: 'urgent',
    time: '4小时前'
  }, {
    id: 3,
    title: '请假申请',
    department: '人力资源',
    applicant: '王五',
    amount: '3天',
    status: 'pending',
    time: '1天前'
  }];
  const recentActivities = [{
    type: 'finance',
    title: '新收入入账',
    description: '来自A客户的付款 ¥150,000',
    time: '30分钟前',
    icon: DollarSign
  }, {
    type: 'supply',
    title: '采购订单已完成',
    description: '订单 PO-2024-00123',
    time: '1小时前',
    icon: Package
  }, {
    type: 'production',
    title: '生产任务完成',
    description: '产品批次 B-2024-0456',
    time: '2小时前',
    icon: Factory
  }, {
    type: 'hr',
    title: '新员工入职',
    description: '赵六加入销售团队',
    time: '3小时前',
    icon: Users
  }];
  const handlePageChange = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  return <div className="flex min-h-screen bg-[#F1F5F9]">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      
      <div className="flex-1 flex flex-col">
        <Header title="仪表盘" notifications={notifications} />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-['Space_Grotesk'] mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-[#0F172A] font-['Playfair_Display']">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    {stat.trend === 'up' ? <ArrowUpRight size={16} className="text-emerald-600" /> : <ArrowDownRight size={16} className="text-red-600" />}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500">较上月</span>
                  </div>
                </div>;
          })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 待办事项 */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-[#0F172A] font-['Playfair_Display']">待办事项</h3>
              </div>
              <div className="p-4">
                {pendingTasks.map(task => <div key={task.id} className="p-4 mb-3 rounded-lg border border-slate-200 hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      {task.status === 'urgent' ? <AlertTriangle size={18} className="text-red-600 mt-0.5" /> : <Clock size={18} className="text-amber-600 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-[#0F172A] font-['Space_Grotesk']">{task.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{task.department} - {task.applicant}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-semibold text-[#D4AF37]">{task.amount}</span>
                          <span className="text-xs text-slate-400">{task.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* 最近活动 */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-[#0F172A] font-['Playfair_Display']">最近活动</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return <div key={index} className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#0F172A] text-white">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F172A] font-['Space_Grotesk']">{activity.title}</p>
                          <p className="text-sm text-slate-500 mt-1">{activity.description}</p>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">快捷入口</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{
              title: '新建报销',
              icon: DollarSign,
              color: 'from-emerald-500 to-emerald-600'
            }, {
              title: '采购申请',
              icon: Package,
              color: 'from-blue-500 to-blue-600'
            }, {
              title: '生产计划',
              icon: Factory,
              color: 'from-amber-500 to-amber-600'
            }, {
              title: '请假申请',
              icon: Users,
              color: 'from-purple-500 to-purple-600'
            }].map((item, index) => {
              const Icon = item.icon;
              return <button key={index} className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1`}>
                    <Icon size={28} className="mb-2" />
                    <p className="font-medium font-['Space_Grotesk']">{item.title}</p>
                  </button>;
            })}
            </div>
          </div>
        </main>
      </div>
    </div>;
}