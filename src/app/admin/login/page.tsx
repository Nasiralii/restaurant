'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AdminAuthClient } from '@/lib/admin-auth-client'
import { Eye, EyeOff, Coffee } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Attempting login with:', email)
      
      const { data, error } = await AdminAuthClient.signIn(email, password)

      if (error) {
        console.error('Login error:', error)
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        return
      }

      if (!data.user) {
        console.error('No user in response')
        setError('فشل تسجيل الدخول')
        return
      }

      console.log('Login successful, user ID:', data.user.id)

      // Check if user is admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .eq('is_active', true)
        .single()

      if (adminError || !adminUser) {
        console.error('Admin check failed:', adminError)
        setError('ليس لديك صلاحية الوصول إلى لوحة الإدارة')
        await AdminAuthClient.signOut()
        return
      }

      console.log('Admin user found:', adminUser)

      // Update last login
      await AdminAuthClient.updateLastLogin(data.user.id)
      
      // Add a small delay before redirect
      setTimeout(() => {
        console.log('Redirecting to dashboard...')
        router.push('/admin/dashboard')
      }, 500)
      
    } catch (error) {
      console.error('Submit error:', error)
      setError('حدث خطأ ما. يرجى المحاولة مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Coffee className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">تسجيل دخول المدير</h1>
          <p className="text-gray-600">لوحة تحكم المطعم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="admin@restaurant.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Implement password reset
              alert('سيتم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني')
            }}
          >
            نسيت كلمة المرور؟
          </a>
        </div>
      </div>
    </div>
  )
}
