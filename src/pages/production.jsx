// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Factory, CheckCircle2, Clock, AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Play, Pause, Plus, Target, Zap } from 'lucide-react';

import { Sidebar, Header } from '@/components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';
export default function Production({
  $w
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('production');
  const [activeTab, setActiveTab] = useState('tasks');
  const productionStats = [{
    title: '生产任务',
    value: '89',
    change: '-3.1%',
    trend: 'down'
  }, {
    title: '已完成',
    value: '67',
    change: '+5.8%',
    trend: 'up'
  }, {
    title: '进行中',
    value: '18',
    change: '+12.5%',
    trend: 'up'
  }, {
    title: '合格率',
    value: '98.5%',
    change: '+0.3%',
    trend: 'up'
  }];
  const productionTrendData = [{
    month: '1月',
    planned: 80,
    completed: 75,
    qualified: 73
  }, {
    month: '2月',
    planned: 85,
    completed: 82,
    qualified: 80
  }, {
    month: '3月',
    planned: 90,
    completed: 88,
    qualified: 85
  }, {
    month: '4月',
    planned: 95,
    completed: 92,
    qualified: 89
  }, {
    month: '5月',
    planned: 100,
    completed: 98,
    qualified: 96
  }, {
    month: '6月',
    planned: 89,
    completed: 67,
    qualified: 66
  }];
  const qualityData = [{
    name: '合格',
    value: 3450,
    color: '#10B981'
  }, {
    name: '返工',
    value: 180,
    color: '#F59E0B'
  }, {
    name: '报废',
    value: 45,
    color: '#EF4444'
  }];
  const productionTasks = [{
    id: 'PROD-2024-00123',
    product: '产品A',
    batch: 'B-2024-0456',
    quantity: 500,
    completed: 350,
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-06-10',
    endDate: '2024-06-20'
  }, {
    id: 'PROD-2024-00122',
    product: '产品B',
    batch: 'B-2024-0455',
    quantity: 300,
    completed: 300,
    status: 'completed',
    priority: 'medium',
    startDate: '2024-06-05',
    endDate: '2024-06-12'
  }, {
    id: 'PROD-2024-00121',
    product: '产品C',
    batch: 'B-2024-0454',
    quantity: 200,
    completed: 80,
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-06-08',
    endDate: '2024-06-15'
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
        <Header title="生产管理" notifications={4} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {productionStats.map((stat, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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

          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-slate-200">
              <nav className="flex px-6">
                {[{
                id: 'tasks',
                label: '生产任务'
              }, {
                id: 'planning',
                label: '生产计划'
              }, {
                id: 'quality',
                label: '质量控制'
              }, {
                id: 'analysis',
                label: '数据分析'
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
              {activeTab === 'tasks' && <div>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productionTrendData}>
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
                        <Line type="monotone" dataKey="planned" stroke="#D4AF37" strokeWidth={2} name="计划" />
                        <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="完成" />
                        <Line type="monotone" dataKey="qualified" stroke="#6366F1" strokeWidth={2} name="合格" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target size={18} className="text-[#D4AF37]" />
                      <span className="text-sm text-slate-600 font-medium">当前生产任务</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <Plus size={18} />
                      <span className="font-['Space_Grotesk']">新建任务</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {productionTasks.map(task => <div key={task.id} className="p-5 border border-slate-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-semibold text-[#0F172A] font-['Playfair_Display']">
                                {task.id}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {task.priority === 'high' ? '高优先级' : '普通'}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                {task.status === 'completed' ? '已完成' : '进行中'}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">产品名称</p>
                                <p className="font-medium text-[#0F172A]">{task.product}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">批次号</p>
                                <p className="font-medium text-[#0F172A]">{task.batch}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">计划数量</p>
                                <p className="font-medium text-[#0F172A]">{task.quantity} 件</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">完成进度</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                                    <div className="bg-[#D4AF37] h-2 rounded-full transition-all" style={{
                                width: `${task.completed / task.quantity * 100}%`
                              }} />
                                  </div>
                                  <span className="text-sm font-semibold text-[#0F172A]">
                                    {Math.round(task.completed / task.quantity * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">开始日期</p>
                                <p className="font-medium text-[#0F172A]">{task.startDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 font-['Space_Grotesk']">预计完成</p>
                                <p className="font-medium text-[#0F172A]">{task.endDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {task.status === 'in-progress' && <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                <CheckCircle2 size={18} />
                              </button>}
                            <button className="p-2 text-slate-600 hover:text-[#D4AF37] transition-colors">
                              <Zap size={20} />
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {activeTab === 'planning' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-slate-200 rounded-xl">
                    <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                      本周生产计划
                    </h4>
                    <div className="space-y-3">
                      {[{
                    day: '周一',
                    task: '产品A - 100件',
                    status: 'completed'
                  }, {
                    day: '周二',
                    task: '产品B - 80件',
                    status: 'completed'
                  }, {
                    day: '周三',
                    task: '产品C - 120件',
                    status: 'in-progress'
                  }, {
                    day: '周四',
                    task: '产品A - 150件',
                    status: 'pending'
                  }, {
                    day: '周五',
                    task: '产品B - 90件',
                    status: 'pending'
                  }].map((item, index) => <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <span className="font-medium text-[#0F172A]">{item.day}</span>
                            <span className="text-sm text-slate-500 ml-3 font-['Space_Grotesk']">{item.task}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            {item.status === 'completed' ? '已完成' : item.status === 'in-progress' ? '进行中' : '待开始'}
                          </span>
                        </div>)}
                    </div>
                  </div>

                  <div className="p-6 border border-slate-200 rounded-xl">
                    <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                      资源分配
                    </h4>
                    <div className="space-y-4">
                      {[{
                    resource: '生产线A',
                    utilization: 85,
                    capacity: 500
                  }, {
                    resource: '生产线B',
                    utilization: 72,
                    capacity: 450
                  }, {
                    resource: '生产线C',
                    utilization: 95,
                    capacity: 380
                  }].map((item, index) => <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#0F172A]">{item.resource}</span>
                            <span className="text-sm text-slate-500">
                              {item.utilization}% / {item.capacity}件
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all ${item.utilization > 90 ? 'bg-red-500' : item.utilization > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{
                        width: `${item.utilization}%`
                      }} />
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>}

              {activeTab === 'quality' && <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 border border-slate-200 rounded-xl">
                      <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                        质量统计
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie data={qualityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                              {qualityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
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

                    <div className="p-6 border border-slate-200 rounded-xl">
                      <h4 className="text-lg font-semibold text-[#0F172A] mb-4 font-['Playfair_Display']">
                        最近质检记录
                      </h4>
                      <div className="space-y-3">
                        {[{
                      batch: 'B-2024-0456',
                      result: '合格',
                      inspector: '质检员A',
                      date: '2024-06-15'
                    }, {
                      batch: 'B-2024-0455',
                      result: '合格',
                      inspector: '质检员B',
                      date: '2024-06-14'
                    }, {
                      batch: 'B-2024-0454',
                      result: '返工',
                      inspector: '质检员A',
                      date: '2024-06-13'
                    }, {
                      batch: 'B-2024-0453',
                      result: '合格',
                      inspector: '质检员C',
                      date: '2024-06-12'
                    }].map((record, index) => <div key={index} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-[#0F172A]">{record.batch}</span>
                                <span className="text-sm text-slate-500 ml-3 font-['Space_Grotesk']">
                                  {record.inspector}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.result === '合格' ? 'bg-emerald-100 text-emerald-700' : record.result === '返工' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                  {record.result}
                                </span>
                                <span className="text-xs text-slate-400">{record.date}</span>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>}

              {activeTab === 'analysis' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[{
                title: '生产效率分析',
                desc: '分析生产效率趋势和瓶颈'
              }, {
                title: '设备利用率',
                desc: '监控设备运行状态和效率'
              }, {
                title: '质量趋势分析',
                desc: '追踪质量指标变化趋势'
              }, {
                title: '成本分析',
                desc: '分析生产成本构成和变化'
              }, {
                title: '人员绩效',
                desc: '评估员工生产绩效'
              }, {
                title: '自定义报表',
                desc: '创建个性化生产报表'
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