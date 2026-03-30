import { supabase, AdminUser } from './supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value
    
    if (!token) {
      return null
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return null
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return null
    }

    return adminUser
  } catch (error) {
    console.error('Error getting current admin:', error)
    return null
  }
}

export async function requireAuth() {
  const admin = await getCurrentAdmin()
  
  if (!admin) {
    redirect('/admin/login')
  }
  
  return admin
}

export async function requireSuperAdmin() {
  const admin = await requireAuth()
  
  if (admin.role !== 'super_admin') {
    redirect('/admin/dashboard')
  }
  
  return admin
}

export async function updateLastLogin(userId: string) {
  try {
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId)
  } catch (error) {
    console.error('Error updating last login:', error)
  }
}
