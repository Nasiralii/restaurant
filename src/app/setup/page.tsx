'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const createAdminUser = async () => {
    setLoading(true)
    setResult(null)

    try {
      // First try to sign in with the default credentials
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@restaurant.com',
        password: 'admin123456'
      })

      if (signInData.user) {
        // User exists, check if admin profile exists
        const { data: adminProfile } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', signInData.user.id)
          .single()

        if (adminProfile) {
          setResult({
            success: true,
            message: 'Admin user already exists! You can login with admin@restaurant.com / admin123456'
          })
          return
        }

        // Create admin profile for existing user
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert({
            id: signInData.user.id,
            email: 'admin@restaurant.com',
            full_name: 'Super Admin',
            role: 'super_admin',
            is_active: true
          })

        if (profileError) {
          throw profileError
        }

        setResult({
          success: true,
          message: 'Admin profile created for existing user! You can login with admin@restaurant.com / admin123456'
        })
        return
      }

      // If sign in fails, try to create the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'admin@restaurant.com',
        password: 'admin123456',
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`,
          data: {
            full_name: 'Super Admin'
          }
        }
      })

      if (authError) {
        throw new Error(`Failed to create admin user: ${authError.message}`)
      }

      if (authData.user) {
        // Create admin user profile
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert({
            id: authData.user.id,
            email: 'admin@restaurant.com',
            full_name: 'Super Admin',
            role: 'super_admin',
            is_active: true
          })

        if (profileError) {
          throw profileError
        }

        setResult({
          success: true,
          message: 'Admin user created successfully! Please check your email to verify, then login with admin@restaurant.com / admin123456'
        })
      }
    } catch (error) {
      console.error('Setup error:', error)
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup</h1>
          <p className="text-gray-600">Create your admin account</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Default Admin Credentials:</h3>
          <div className="text-sm text-blue-800">
            <p><strong>Email:</strong> admin@restaurant.com</p>
            <p><strong>Password:</strong> admin123456</p>
          </div>
        </div>

        {result && (
          <div className={`rounded-lg p-4 mb-6 ${
            result.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 ml-2" />
              )}
              <p className={`text-sm ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.message}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={createAdminUser}
          disabled={loading}
          className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 ml-2 animate-spin" />
              Creating Admin User...
            </>
          ) : (
            'Create Admin User'
          )}
        </button>

        {result?.success && (
          <div className="mt-6 text-center">
            <a
              href="/admin/login"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Go to Admin Login →
            </a>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>⚠️ Delete this page after setup for security</p>
        </div>
      </div>
    </div>
  )
}
