'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Order, OrderItem } from '@/lib/supabase'
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileText,
  Truck,
  Store,
  Clock,
  CheckCircle,
  XCircle,
  Printer
} from 'lucide-react'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    fetchOrderDetails()
    
    // Set up real-time subscription for this order
    const subscription = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          setOrder(payload.new as Order)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      // Fetch order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderError) throw orderError

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)

      if (itemsError) throw itemsError

      setOrder(orderData)
      setOrderItems(itemsData || [])
    } catch (error) {
      console.error('Error fetching order details:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    setUpdatingStatus(true)
    try {
      const updateData: any = { status: newStatus }
      
      // Add timestamp based on status
      const now = new Date().toISOString()
      if (newStatus === 'confirmed') {
        updateData.confirmed_at = now
      } else if (newStatus === 'preparing') {
        updateData.prepared_at = now
      } else if (newStatus === 'delivered') {
        updateData.delivered_at = now
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)

      if (error) throw error

      setOrder(prev => prev ? { ...prev, status: newStatus as any, ...updateData } : null)
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('حدث خطأ أثناء تحديث الحالة')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      preparing: { label: 'قيد التحضير', color: 'bg-purple-100 text-purple-800', icon: Clock },
      on_way: { label: 'في الطريق', color: 'bg-indigo-100 text-indigo-800', icon: Truck },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Clock
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config?.color || 'bg-gray-100 text-gray-800'}`}>
        <Icon className="w-4 h-4 ml-2" />
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

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">الطلب غير موجود</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 ml-4"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">تفاصيل الطلب #{order.order_number}</h1>
            <p className="text-gray-600 mt-1">{formatDateTime(order.ordered_at)}</p>
          </div>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">حالة الطلب</h2>
            {getStatusBadge(order.status)}
          </div>
          <div className="flex space-x-2 space-x-reverse">
            {order.status === 'pending' && (
              <button
                onClick={() => updateOrderStatus('confirmed')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                تأكيد الطلب
              </button>
            )}
            {order.status === 'confirmed' && (
              <button
                onClick={() => updateOrderStatus('preparing')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                بدء التحضير
              </button>
            )}
            {order.status === 'preparing' && (
              <button
                onClick={() => updateOrderStatus('on_way')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                في الطريق
              </button>
            )}
            {order.status === 'on_way' && (
              <button
                onClick={() => updateOrderStatus('delivered')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                تم التوصيل
              </button>
            )}
            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <button
                onClick={() => updateOrderStatus('cancelled')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                إلغاء الطلب
              </button>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <div className={`flex-1 text-center ${order.status === 'pending' ? 'text-amber-600 font-medium' : 'text-green-600'}`}>
              <Clock className="w-5 h-5 mx-auto mb-1" />
              قيد الانتظار
            </div>
            <div className={`flex-1 text-center ${order.status === 'confirmed' ? 'text-blue-600 font-medium' : order.ordered_at ? 'text-green-600' : 'text-gray-400'}`}>
              <CheckCircle className="w-5 h-5 mx-auto mb-1" />
              مؤكد
            </div>
            <div className={`flex-1 text-center ${order.status === 'preparing' ? 'text-purple-600 font-medium' : order.confirmed_at ? 'text-green-600' : 'text-gray-400'}`}>
              <Clock className="w-5 h-5 mx-auto mb-1" />
              قيد التحضير
            </div>
            <div className={`flex-1 text-center ${order.status === 'on_way' ? 'text-indigo-600 font-medium' : order.prepared_at ? 'text-green-600' : 'text-gray-400'}`}>
              <Truck className="w-5 h-5 mx-auto mb-1" />
              في الطريق
            </div>
            <div className={`flex-1 text-center ${order.status === 'delivered' ? 'text-green-600 font-medium' : order.delivered_at ? 'text-green-600' : 'text-gray-400'}`}>
              <CheckCircle className="w-5 h-5 mx-auto mb-1" />
              تم التوصيل
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: order.status === 'pending' ? '20%' :
                       order.status === 'confirmed' ? '40%' :
                       order.status === 'preparing' ? '60%' :
                       order.status === 'on_way' ? '80%' :
                       order.status === 'delivered' ? '100%' : '0%'
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">معلومات العميل</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-gray-500 ml-3">الاسم:</span>
              <span className="font-medium">{order.customer_name}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 ml-2" />
              <a href={`tel:${order.customer_phone}`} className="text-amber-600 hover:text-amber-700">
                {order.customer_phone}
              </a>
            </div>
            <div className="flex items-center">
              {order.order_type === 'delivery' ? (
                <Truck className="w-4 h-4 text-blue-600 ml-2" />
              ) : (
                <Store className="w-4 h-4 text-green-600 ml-2" />
              )}
              <span className="font-medium">
                {order.order_type === 'delivery' ? 'توصيل' : 'استلام من المطعم'}
              </span>
            </div>
            {order.order_type === 'delivery' && order.delivery_address && (
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gray-400 ml-2 mt-1" />
                <span className="text-gray-600">{order.delivery_address}</span>
              </div>
            )}
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-gray-400 ml-2" />
              <span className="text-gray-600">{order.payment_method}</span>
            </div>
            {order.special_instructions && (
              <div className="flex items-start">
                <FileText className="w-4 h-4 text-gray-400 ml-2 mt-1" />
                <span className="text-gray-600">{order.special_instructions}</span>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">عناصر الطلب</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    المنتج
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    الكمية
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    السعر
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    الإجمالي
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.product_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-left text-gray-600">
                      {formatCurrency(item.product_price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-left font-medium text-gray-900">
                      {formatCurrency(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                <span className="font-medium">{formatCurrency(order.vat_amount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>الإجمالي:</span>
                <span className="text-amber-600">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
