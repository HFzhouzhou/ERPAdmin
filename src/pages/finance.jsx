// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, PieChart, Calendar, Filter, Download, Eye, Check, X } from 'lucide-react';
// @ts-ignore;
import { Pie } from '@/components/ui';

import { Sidebar, Header } from '@/components/Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';
export default function Finance({
  $w
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('finance');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟财务数据
  const revenueData = [{
    month: '1月',
    revenue: 1850000,
    cost: 1200000
  }, {
    month: '2月',
    revenue: 2100000,
    cost: 1400000
  }, {
    month: '3月',
    revenue: 2450000,
    cost: 1600000
  }, {
    month: '4月',
    revenue: 2300000,
    cost: 1550000
  }, {
    month: '5月',
    revenue: 2680000,
    cost: 1750000
  }, {
    month: '6月',
    revenue: 2847500,
    cost: 1850000
  }];
  const expenseData = [{
    name: '采购成本',
    value: 1850000,
    color: '#D4AF37'
  }, {
    name: '人力成本',
    value: 850000,
    color: '#0F172A'
  }, {
    name: '运营费用',
    value: 450000,
    color: '#64748B'
  }, {
    name: '其他支出',
    value: 155000,
    color: '#94A3B8'
  }];
  const transactions = [{
    id: 1,
    type: 'income',
    title: '客户A付款',
    amount: 150000,
    date: '2024-06-15',
    status: 'completed'
  }, {
    id: 2,
    type: 'expense',
    title: '供应商付款',
    amount: -85000,
    date: '2024-06-14',
    status: 'completed'
  }, {
    id: 3,
    type: 'income',
    title: '客户B付款',
    amount: 280000,
    date: '2024-06-13',
    status: 'completed'
  }, {
    id: 4,
    type: 'expense',
    title: '工资发放',
    amount: -320000,
    date: '2024-06-10',
    status: 'pending'
  }, {
    id: 5,
    type: 'income',
    title: '服务费收入',
    amount: 45000,
    date: '2024-06-08',
    status: 'completed'
  }];
  const approvalRequests = [{
    id: 1,
    type: '报销',
    applicant: '张三',
    department: '销售部',
    amount: 3500,
    reason: '差旅费',
    date: '2024-06-15'
  }, {
    id: 2,
    type: '报销',
    applicant: '李四',
    department: '技术部',
    amount: 12800,
    reason: '设备采购',
    date: '2024-06-14'
  }, {
    id: 3,
    type: '报销',
    applicant: '王五',
    department: '市场部',
    amount: 5600,
    reason: '会议费',
    date: '2024-06-13'
  }];
  const financialStats = [{
    title: '本月收入',
    value: '¥2,847,500',
    change: '+12.5%',
    trend: 'up'
  }, {
    title: '本月支出',
    value: '¥1,850,000',
    change: '+8.3%',
    trend: 'up'
  }, {
    title: '净利润',
    value: '¥997,500',
    change: '+18.7%',
    trend: 'up'
  }, {
    title: '应收账款',
    value: '¥856,000',
    change: '-5.2%',
    trend: 'down'
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
        <Header title="财务管理" notifications={3} />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* 财务统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {financialStats.map((stat, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-['Space_Grotesk'] mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#0F172A] font-['Playfair_Display']">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {stat.trend === 'up' ? <ArrowUpRight size={16} className="text-emerald-600" /> : <ArrowDownRight size={16} className="text-red-600" />}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500">较上月</span>
                </div>
              </div>)}
          </div>

          {/* 切换标签 */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b border-slate-200">
              <nav className="flex px-6">
                {[{
                id: 'overview',
                label: '概览'
              }, {
                id: 'transactions',
                label: '交易记录'
              }, {
                id: 'approvals',
                label: '审批管理'
              }, {
                id: 'reports',
                label: '财务报表'
              }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`
                      px-6 py-4 font-['Space_Grotesk'] font-medium transition-colors relative
                      ${activeTab === tab.id ? 'text-[#D4AF37]' : 'text-slate-600 hover:text-slate-900'}
                    `}>
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />}
                  </button>)}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && <div className="space-y-6">
                  {/* 收入趋势图 */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-[#0F172A] font-['Playfair_Display']">
                        收入与支出趋势
                      </h4>
                      <div className="flex items-center gap-2">
                        <button className={`px-3 py-1.5 rounded-lg text-sm font-['Space_Grotesk'] transition-colors ${selectedPeriod === 'month' ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} onClick={() => setSelectedPeriod('month')}>
                          月度
                        </button>
                        <button className={`px-3 py-1.5 rounded-lg text-sm font-['Space_Grotesk'] transition-colors ${selectedPeriod === 'quarter' ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} onClick={() => setSelectedPeriod('quarter')}>
                          季度
                        </button>
                      </div>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                          <YAxis stroke="#64748B" fontSize={12} />
                          <Tooltip contentStyle={{
                        backgroundColor: '#0F172A',
                        border: 'none',
                        borderRadius: '8px'
                      }} itemStyle={{
                        color: '#fff'
                      }} />
                          <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fill="rgba(212, 175, 55, 0.1)" strokeWidth={2} />
                          <Area type="monotone" dataKey="cost" stroke="#0F172A" fill="rgba(15, 23, 42, 0.05)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 支出分布 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                        支出分布
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie data={expenseData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                              {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{
                          backgroundColor: '#0F172A',
                          border: 'none',
                          borderRadius: '8px'
                        }} itemStyle={{
                          color: '#fff'
                        }} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                        支出明细
                      </h4>
                      {expenseData.map((item, index) => <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{
                        backgroundColor: item.color
                      }} />
                            <span className="font-medium text-[#0F172A] font-['Space_Grotesk']">{item.name}</span>
                          </div>
                          <span className="font-semibold text-[#0F172A] font-['Playfair_Display']">
                            ¥{(item.value / 10000).toFixed(1)}万
                          </span>
                        </div>)}
                    </div>
                  </div>
                </div>}

              {activeTab === 'transactions' && <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Filter size={18} className="text-slate-500" />
                      <span className="text-sm text-slate-500 font-['Space_Grotesk']">筛选</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <Download size={18} />
                      <span className="font-['Space_Grotesk']">导出</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">类型</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">描述</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">金额</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">日期</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">状态</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(item => <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {item.type === 'income' ? '收入' : '支出'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#0F172A] font-['Space_Grotesk']">{item.title}</td>
                            <td className={`py-3 px-4 font-semibold font-['Playfair_Display'] ${item.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                              {item.amount > 0 ? '+' : ''}¥{Math.abs(item.amount).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-['Space_Grotesk']">{item.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {item.status === 'completed' ? '已完成' : '处理中'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-[#D4AF37] hover:text-[#B8941F]">
                                <Eye size={18} />
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}

              {activeTab === 'approvals' && <div>
                  <div className="space-y-4">
                    {approvalRequests.map(request => <div key={request.id} className="p-5 border border-slate-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-[#D4AF37] text-[#0F172A] rounded-full text-sm font-medium">
                                {request.type}
                              </span>
                              <span className="text-sm text-slate-500 font-['Space_Grotesk']">{request.date}</span>
                            </div>
                            <p className="font-medium text-[#0F172A] font-['Playfair_Display'] text-lg">
                              {request.reason}
                            </p>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">申请人</p>
                                <p className="font-medium text-[#0F172A]">{request.applicant}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">部门</p>
                                <p className="font-medium text-[#0F172A]">{request.department}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">金额</p>
                                <p className="font-bold text-[#D4AF37] font-['Playfair_Display']">¥{request.amount.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                              <Check size={18} />
                              <span>通过</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                              <X size={18} />
                              <span>拒绝</span>
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {activeTab === 'reports' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[{
                title: '资产负债表',
                desc: '查看企业资产与负债情况'
              }, {
                title: '利润表',
                desc: '分析收入、成本与利润'
              }, {
                title: '现金流量表',
                desc: '监控现金流入与流出'
              }, {
                title: '应收账款报告',
                desc: '管理客户应收账款'
              }, {
                title: '应付账款报告',
                desc: '管理供应商应付账款'
              }, {
                title: '自定义报表',
                desc: '创建个性化财务报表'
              }].map((report, index) => <div key={index} className="p-6 border border-slate-200 rounded-xl hover:border-[#D4AF37] hover:shadow-md transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg flex items-center justify-center mb-4">
                        <PieChart size={24} className="text-[#0F172A]" />
                      </div>
                      <h4 className="text-lg font-semibold text-[#0F172A] mb-2 font-['Playfair_Display']">
                        {report.title}
                      </h4>
                      <p className="text-sm text-slate-500 font-['Space_Grotesk']">{report.desc}</p>
                    </div>)}
                </div>}
            </div>
          </div>
        </main>
      </div>
    </div>;
}