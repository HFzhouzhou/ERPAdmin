// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Package, Truck, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Search, Filter, Download } from 'lucide-react';

import { Sidebar, Header } from '@/components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
export default function SupplyChain({
  $w
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('supply-chain');
  const [activeTab, setActiveTab] = useState('orders');

  // 模拟供应链数据
  const inventoryStats = [{
    title: '总库存',
    value: '¥12,580,000',
    change: '+5.2%',
    trend: 'up'
  }, {
    title: '采购订单',
    value: '156',
    change: '+8.2%',
    trend: 'up'
  }, {
    title: '待入库',
    value: '32',
    change: '-12.5%',
    trend: 'down'
  }, {
    title: '库存预警',
    value: '8',
    change: '-25.0%',
    trend: 'down'
  }];
  const orderTrendData = [{
    month: '1月',
    orders: 120,
    value: 850000
  }, {
    month: '2月',
    orders: 145,
    value: 1020000
  }, {
    month: '3月',
    orders: 168,
    value: 1180000
  }, {
    month: '4月',
    orders: 155,
    value: 1100000
  }, {
    month: '5月',
    orders: 172,
    value: 1240000
  }, {
    month: '6月',
    orders: 156,
    value: 1080000
  }];
  const purchaseOrders = [{
    id: 'PO-2024-00123',
    supplier: '上海供应商A',
    items: '电子元件 x500',
    amount: 45000,
    status: 'pending',
    date: '2024-06-15',
    eta: '2024-06-20'
  }, {
    id: 'PO-2024-00122',
    supplier: '北京供应商B',
    items: '原材料 x200',
    amount: 28000,
    status: 'in-transit',
    date: '2024-06-10',
    eta: '2024-06-18'
  }, {
    id: 'PO-2024-00121',
    supplier: '广州供应商C',
    items: '包装材料 x1000',
    amount: 8500,
    status: 'completed',
    date: '2024-06-05',
    eta: '2024-06-12'
  }];
  const inventoryItems = [{
    id: 'INV-001',
    name: '电子元件A',
    sku: 'EC-A001',
    quantity: 1250,
    unit: '件',
    minStock: 500,
    status: 'normal',
    location: '仓库A-1-01'
  }, {
    id: 'INV-002',
    name: '原材料B',
    sku: 'RM-B001',
    quantity: 850,
    unit: 'kg',
    minStock: 800,
    status: 'warning',
    location: '仓库A-2-03'
  }, {
    id: 'INV-003',
    name: '包装材料C',
    sku: 'PK-C001',
    quantity: 3200,
    unit: '件',
    minStock: 1000,
    status: 'normal',
    location: '仓库B-1-05'
  }];
  const suppliers = [{
    id: 1,
    name: '上海供应商A',
    contact: '张经理',
    phone: '021-12345678',
    rating: 4.8,
    orders: 56
  }, {
    id: 2,
    name: '北京供应商B',
    contact: '李经理',
    phone: '010-87654321',
    rating: 4.5,
    orders: 42
  }, {
    id: 3,
    name: '广州供应商C',
    contact: '王经理',
    phone: '020-55555555',
    rating: 4.9,
    orders: 38
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
        <Header title="供应链管理" notifications={2} />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* 库存统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {inventoryStats.map((stat, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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

          {/* 功能标签页 */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-slate-200">
              <nav className="flex px-6">
                {[{
                id: 'orders',
                label: '采购订单'
              }, {
                id: 'inventory',
                label: '库存管理'
              }, {
                id: 'suppliers',
                label: '供应商'
              }, {
                id: 'reports',
                label: '报表分析'
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
              {activeTab === 'orders' && <div>
                  {/* 订单趋势图 */}
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={orderTrendData}>
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
                        <Line type="monotone" dataKey="orders" stroke="#D4AF37" strokeWidth={2} dot={{
                      fill: '#D4AF37'
                    }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 订单列表 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-slate-500" />
                      <input type="text" placeholder="搜索订单..." className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <Plus size={18} />
                      <span className="font-['Space_Grotesk']">新建订单</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {purchaseOrders.map(order => <div key={order.id} className="p-5 border border-slate-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-semibold text-[#0F172A] font-['Playfair_Display']">
                                {order.id}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                {order.status === 'completed' ? '已完成' : order.status === 'in-transit' ? '运输中' : '待处理'}
                              </span>
                            </div>
                            <p className="text-[#0F172A] font-medium mb-2">{order.supplier}</p>
                            <p className="text-sm text-slate-500 font-['Space_Grotesk']">{order.items}</p>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">订单日期</p>
                                <p className="font-medium text-[#0F172A]">{order.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">预计到货</p>
                                <p className="font-medium text-[#0F172A]">{order.eta}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">订单金额</p>
                                <p className="font-bold text-[#D4AF37] font-['Playfair_Display']">
                                  ¥{order.amount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {activeTab === 'inventory' && <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={18} className="text-amber-600" />
                      <span className="text-sm text-amber-600 font-medium">8 个库存预警</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <Plus size={18} />
                      <span className="font-['Space_Grotesk']">添加库存</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            商品信息
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            库存数量
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            最小库存
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            状态
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            位置
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-[#0F172A] font-['Playfair_Display']">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryItems.map(item => <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-[#0F172A] font-['Playfair_Display']">
                                  {item.name}
                                </p>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">{item.sku}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-[#0F172A] font-['Playfair_Display']">
                                {item.quantity} {item.unit}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{item.minStock} {item.unit}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {item.status === 'normal' ? '正常' : '预警'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-['Space_Grotesk']">{item.location}</td>
                            <td className="py-3 px-4">
                              <button className="text-[#D4AF37] hover:text-[#B8941F]">
                                编辑
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}

              {activeTab === 'suppliers' && <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-slate-500" />
                      <input type="text" placeholder="搜索供应商..." className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <Plus size={18} />
                      <span className="font-['Space_Grotesk']">添加供应商</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suppliers.map(supplier => <div key={supplier.id} className="p-5 border border-slate-200 rounded-xl hover:border-[#D4AF37] hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg flex items-center justify-center">
                            <Truck size={24} className="text-[#0F172A]" />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-[#D4AF37]">
                              {supplier.rating}
                            </span>
                            <span className="text-slate-400">/5.0</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-[#0F172A] mb-3 font-['Playfair_Display']">
                          {supplier.name}
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-slate-500 font-['Space_Grotesk']">联系人</p>
                            <p className="font-medium text-[#0F172A]">{supplier.contact}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 font-['Space_Grotesk']">联系电话</p>
                            <p className="font-medium text-[#0F172A]">{supplier.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 font-['Space_Grotesk']">历史订单</p>
                            <p className="font-medium text-[#0F172A]">{supplier.orders} 笔</p>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {activeTab === 'reports' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[{
                title: '采购报表',
                desc: '分析采购订单和支出趋势'
              }, {
                title: '库存报表',
                desc: '监控库存水平和周转率'
              }, {
                title: '供应商评估',
                desc: '评估供应商绩效和可靠性'
              }, {
                title: '库存周转分析',
                desc: '分析库存周转效率'
              }, {
                title: '采购成本分析',
                desc: '追踪采购成本变化'
              }, {
                title: '自定义报表',
                desc: '创建个性化供应链报表'
              }].map((report, index) => <div key={index} className="p-6 border border-slate-200 rounded-xl hover:border-[#D4AF37] hover:shadow-md transition-all cursor-pointer">
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