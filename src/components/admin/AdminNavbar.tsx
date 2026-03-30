'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AdminAuthClient } from '@/lib/admin-auth-client'
import { AdminUser } from '@/lib/supabase'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Coffee
} from 'lucide-react'

interface AdminNavbarProps {
  admin: AdminUser | null
}

export function AdminNavbar({ admin }: AdminNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await AdminAuthClient.signOut()
    router.push('/admin/login')
  }

  const navigation = [
    { name: 'لوحة التحكم', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'المنتجات', href: '/admin/products', icon: Package },
    { name: 'الطلبات', href: '/admin/orders', icon: ShoppingCart },
    { name: 'الإحصائيات', href: '/admin/analytics', icon: BarChart3 },
    ...(admin?.role === 'super_admin' ? [{ name: 'الإعدادات', href: '/admin/settings', icon: Settings }] : []),
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-2 space-x-reverse">
            <Coffee className="w-8 h-8 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">لوحة الإدارة</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-amber-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-900">{admin?.full_name || admin?.email || 'Admin'}</div>
              <div className="text-xs text-gray-500 capitalize">{admin?.role?.replace('_', ' ') || 'User'}</div>
            </div>
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-900">{admin?.full_name || admin?.email || 'Admin'}</div>
                  <div className="text-xs text-gray-500 capitalize">{admin?.role?.replace('_', ' ') || 'User'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
