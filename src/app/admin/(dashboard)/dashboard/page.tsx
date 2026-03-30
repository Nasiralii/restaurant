'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, Order } from '@/lib/supabase'
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Clock,
  Plus,
  Eye,
  Download,
  Truck,
  Store
} from 'lucide-react'

interface DashboardStats {
  ordersToday: number
  revenueToday: number
  pendingOrders: number
  activeProducts: number
  ordersTrend: number
  revenueTrend: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    ordersToday: 0,
    revenueToday: 0,
    pendingOrders: 0,
    activeProducts: 0,
    ordersTrend: 0,
    revenueTrend: 0
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    
    // Set up real-time subscription for new orders
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('New order:', payload)
          fetchDashboardData() // Refresh data when new order comes in
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      // Fetch today's orders
      const { data: todayOrders, error: todayError } = await supabase
        .from('orders')
        .select('*')
        .gte('ordered_at', today.toISOString())
        .order('ordered_at', { ascending: false })

      if (todayError) throw todayError

      // Fetch yesterday's orders for trend
      const { data: yesterdayOrders, error: yesterdayError } = await supabase
        .from('orders')
        .select('*')
        .gte('ordered_at', yesterday.toISOString())
        .lt('ordered_at', today.toISOString())

      if (yesterdayError) throw yesterdayError

      // Fetch pending orders
      const { data: pendingOrders, error: pendingError } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('ordered_at', { ascending: false })

      if (pendingError) throw pendingError

      // Fetch active products
      const { data: activeProducts, error: productsError } = await supabase
        .from('products')
        .select('id')
        .eq('is_available', true)

      if (productsError) throw productsError

      // Fetch recent orders (last 10)
      const { data: recentOrdersData, error: recentError } = await supabase
        .from('orders')
        .select('*')
        .order('ordered_at', { ascending: false })
        .limit(10)

      if (recentError) throw recentError

      // Calculate stats
      const ordersToday = todayOrders?.length || 0
      const revenueToday = todayOrders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
      const pendingOrdersCount = pendingOrders?.length || 0
      const activeProductsCount = activeProducts?.length || 0

      const ordersYesterday = yesterdayOrders?.length || 0
      const revenueYesterday = yesterdayOrders?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      const ordersTrend = ordersYesterday > 0 ? 
        ((ordersToday - ordersYesterday) / ordersYesterday) * 100 : 0
      const revenueTrend = revenueYesterday > 0 ? 
        ((revenueToday - revenueYesterday) / revenueYesterday) * 100 : 0

      setStats({
        ordersToday,
        revenueToday,
        pendingOrders: pendingOrdersCount,
        activeProducts: activeProductsCount,
        ordersTrend,
        revenueTrend
      })

      setRecentOrders(recentOrdersData || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-800' },
      preparing: { label: 'قيد التحضير', color: 'bg-purple-100 text-purple-800' },
      on_way: { label: 'في الطريق', color: 'bg-indigo-100 text-indigo-800' },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color || 'bg-gray-100 text-gray-800'}`}>
        {config?.label || status}
      </span>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `منذ ${hours} ساعة`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `منذ ${days} يوم`
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-2">نظرة عامة على أداء المطعم</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>تصدير اليوم</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الطلبات اليوم</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.ordersToday}</p>
              <div className={`flex items-center mt-2 text-sm ${
                stats.ordersTrend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4 ml-1" />
                {stats.ordersTrend >= 0 ? '+' : ''}{stats.ordersTrend.toFixed(1)}%
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الإيرادات اليوم</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(stats.revenueToday)}</p>
              <div className={`flex items-center mt-2 text-sm ${
                stats.revenueTrend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4 ml-1" />
                {stats.revenueTrend >= 0 ? '+' : ''}{stats.revenueTrend.toFixed(1)}%
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
              <p className="text-sm font-medium text-gray-600">الطلبات المعلقة</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 ml-1" />
                تنتار المعالجة
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المنتجات النشطة</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeProducts}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Package className="w-4 h-4 ml-1" />
                متاحة للطلب
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">الطلبات الأخيرة</h2>
            <Link
              href="/admin/orders"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
            >
              <Eye className="w-4 h-4 ml-2" />
              عرض كل الطلبات
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الطلب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الهاتف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجمالي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوقت
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer_phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {order.order_type === 'delivery' ? (
                        <Truck className="w-4 h-4 ml-2 text-blue-600" />
                      ) : (
                        <Store className="w-4 h-4 ml-2 text-green-600" />
                      )}
                      {order.order_type === 'delivery' ? 'توصيل' : 'استلام'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimeAgo(order.ordered_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {recentOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد طلبات بعد</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products/new"
          className="bg-amber-600 text-white rounded-xl p-6 flex items-center justify-center hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-6 h-6 ml-3" />
          <span className="font-medium">إضافة منتج جديد</span>
        </Link>
        
        <Link
          href="/admin/orders?status=pending"
          className="bg-white border border-gray-300 rounded-xl p-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-6 h-6 ml-3 text-gray-600" />
          <span className="font-medium text-gray-900">عرض الطلبات المعلقة</span>
        </Link>
      </div>
    </div>
  )
}
