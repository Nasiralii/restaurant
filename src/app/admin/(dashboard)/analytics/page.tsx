'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface AnalyticsData {
  revenueChart: Array<{ date: string; revenue: number; orders: number }>
  topProducts: Array<{ name: string; quantity: number; revenue: number }>
  orderTypes: Array<{ type: string; count: number; percentage: number }>
  hourlyData: Array<{ hour: string; orders: number }>
  summary: {
    totalRevenue: number
    totalOrders: number
    avgOrderValue: number
    topProduct: string
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days')

  useEffect(() => {
    fetchAnalyticsData()
  }, [dateRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Calculate date range
      const endDate = new Date()
      const startDate = new Date()
      if (dateRange === '7days') {
        startDate.setDate(startDate.getDate() - 7)
      } else if (dateRange === '30days') {
        startDate.setDate(startDate.getDate() - 30)
      } else {
        startDate.setDate(startDate.getDate() - 90)
      }

      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .gte('ordered_at', startDate.toISOString())
        .lte('ordered_at', endDate.toISOString())
        .neq('status', 'cancelled')

      if (ordersError) throw ordersError

      // Fetch order items for product analysis
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('*, orders!inner(*)')
        .gte('orders.ordered_at', startDate.toISOString())
        .lte('orders.ordered_at', endDate.toISOString())

      if (itemsError) throw itemsError

      const processedData = processAnalyticsData(orders || [], orderItems || [], startDate, endDate)
      setData(processedData)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const processAnalyticsData = (
    orders: any[], 
    orderItems: any[], 
    startDate: Date, 
    endDate: Date
  ): AnalyticsData => {
    // Revenue chart data
    const revenueChart = []
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
    const totalOrders = orders.length

    for (let i = 0; i < (dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90); i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayOrders = orders.filter(order => 
        order.ordered_at.startsWith(dateStr)
      )
      
      revenueChart.push({
        date: new Intl.DateTimeFormat('ar-SA', { month: 'short', day: 'numeric' }).format(date),
        revenue: dayOrders.reduce((sum, order) => sum + order.total_amount, 0),
        orders: dayOrders.length
      })
    }

    // Top products
    const productMap = new Map()
    orderItems.forEach(item => {
      if (!productMap.has(item.product_name)) {
        productMap.set(item.product_name, { quantity: 0, revenue: 0 })
      }
      const product = productMap.get(item.product_name)
      product.quantity += item.quantity
      product.revenue += item.subtotal
    })

    const topProducts = Array.from(productMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    // Order types
    const deliveryOrders = orders.filter(order => order.order_type === 'delivery').length
    const pickupOrders = orders.filter(order => order.order_type === 'pickup').length
    const total = orders.length

    const orderTypes = [
      { type: 'توصيل', count: deliveryOrders, percentage: total > 0 ? (deliveryOrders / total) * 100 : 0 },
      { type: 'استلام', count: pickupOrders, percentage: total > 0 ? (pickupOrders / total) * 100 : 0 }
    ]

    // Hourly data
    const hourlyData = []
    for (let hour = 0; hour < 24; hour++) {
      const hourOrders = orders.filter(order => {
        const orderHour = new Date(order.ordered_at).getHours()
        return orderHour === hour
      })
      hourlyData.push({
        hour: `${hour}:00`,
        orders: hourOrders.length
      })
    }

    // Summary
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const topProduct = topProducts[0]?.name || 'N/A'

    return {
      revenueChart,
      topProducts,
      orderTypes,
      hourlyData,
      summary: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        topProduct
      }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  }

  const exportToCSV = () => {
    if (!data) return

    const csvData = [
      ['التاريخ', 'الإيرادات', 'عدد الطلبات'],
      ...data.revenueChart.map(item => [
        item.date,
        item.revenue,
        item.orders
      ])
    ]

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }


  if (!data) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">لا توجد بيانات تحليلية</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">الإحصائيات والتحليلات</h1>
          <p className="text-gray-600 mt-2">نظرة عامة على أداء المطعم</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="7days">آخر 7 أيام</option>
            <option value="30days">آخر 30 يوم</option>
            <option value="90days">آخر 90 يوم</option>
          </select>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(data.summary.totalRevenue)}</p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 ml-1" />
                +12.5% من الشهر الماضي
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{data.summary.totalOrders}</p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 ml-1" />
                +8.2% من الشهر الماضي
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(data.summary.avgOrderValue)}</p>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <TrendingDown className="w-4 h-4 ml-1" />
                -2.1% من الشهر الماضي
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المنتج الأكثر مبيعاً</p>
              <p className="text-lg font-bold text-gray-900 mt-2 truncate">{data.summary.topProduct}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Activity className="w-4 h-4 ml-1" />
                {data.topProducts[0]?.quantity || 0} قطعة
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">الإيرادات والطلبات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="الإيرادات"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="الطلبات"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Types */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">أنواع الطلبات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data.orderTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ payload }) => `${payload?.type}: ${payload?.percentage?.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.orderTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">أفضل 5 منتجات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="revenue" fill="#10b981" name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">الطلبات حسب الساعة</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8b5cf6" name="عدد الطلبات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
