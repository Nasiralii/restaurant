'use client'

import { useState, useEffect } from 'react'
import { supabase, AdminUser } from '@/lib/supabase'
import { requireSuperAdmin } from '@/lib/admin-auth'
import { 
  Settings, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Store,
  Phone,
  Globe,
  Clock,
  Upload,
  Image as ImageIcon
} from 'lucide-react'

export default function SettingsPage() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [restaurantSettings, setRestaurantSettings] = useState({
    name_ar: '',
    name_en: '',
    phone: '',
    email: '',
    address: '',
    vat_percentage: 15,
    opening_hours: '',
    logo_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    full_name: '',
    role: 'admin' as 'super_admin' | 'admin' | 'staff',
    password: ''
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  useEffect(() => {
    fetchSettings()
    fetchAdminUsers()
  }, [])

  const fetchSettings = async () => {
    try {
      // For now, we'll use hardcoded settings. In a real app, this would come from a settings table
      setRestaurantSettings({
        name_ar: 'مطعم القهوة المثالي',
        name_en: 'Perfect Coffee Restaurant',
        phone: '+966 50 123 4567',
        email: 'info@restaurant.com',
        address: 'الرياض، المملكة العربية السعودية',
        vat_percentage: 15,
        opening_hours: '8:00 ص - 11:00 م',
        logo_url: ''
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAdminUsers(data || [])
    } catch (error) {
      console.error('Error fetching admin users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRestaurantSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    setRestaurantSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadLogo = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `logo.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('restaurant-assets')
      .upload(fileName, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('restaurant-assets')
      .getPublicUrl(fileName)

    return publicUrl
  }

  const saveRestaurantSettings = async () => {
    try {
      let logoUrl = restaurantSettings.logo_url

      if (logoFile) {
        logoUrl = await uploadLogo(logoFile)
      }

      setRestaurantSettings(prev => ({ ...prev, logo_url: logoUrl }))
      
      // In a real app, save to database
      alert('تم حفظ إعدادات المطعم بنجاح')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('حدث خطأ أثناء حفظ الإعدادات')
    }
  }

  const addAdminUser = async () => {
    try {
      if (!newAdmin.email || !newAdmin.password) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newAdmin.email,
        password: newAdmin.password,
        options: {
          data: {
            full_name: newAdmin.full_name
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Create admin user profile
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert({
            id: authData.user.id,
            email: newAdmin.email,
            full_name: newAdmin.full_name,
            role: newAdmin.role
          })

        if (profileError) throw profileError

        setNewAdmin({ email: '', full_name: '', role: 'admin', password: '' })
        fetchAdminUsers()
        alert('تم إضافة المدير بنجاح')
      }
    } catch (error) {
      console.error('Error adding admin user:', error)
      alert('حدث خطأ أثناء إضافة المدير')
    }
  }

  const toggleAdminStatus = async (adminId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !currentStatus })
        .eq('id', adminId)

      if (error) throw error

      setAdminUsers(admins => 
        admins.map(admin => 
          admin.id === adminId 
            ? { ...admin, is_active: !currentStatus }
            : admin
        )
      )
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  const deleteAdminUser = async (adminId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المدير؟')) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId)

      if (error) throw error

      setAdminUsers(admins => admins.filter(admin => admin.id !== adminId))
    } catch (error) {
      console.error('Error deleting admin user:', error)
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
          <p className="text-gray-600 mt-2">إعدادات المطعم وإدارة المديرين</p>
        </div>
      </div>

      {/* Restaurant Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Store className="w-5 h-5 ml-2" />
          إعدادات المطعم
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شعار المطعم
            </label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {logoPreview || restaurantSettings.logo_url ? (
                  <img
                    src={logoPreview || restaurantSettings.logo_url}
                    alt="Restaurant logo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 inline-block">
                  <Upload className="w-4 h-4 inline ml-2" />
                  رفع شعار
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG حتى 2MB</p>
              </div>
            </div>
          </div>

          {/* Restaurant Names */}
          <div>
            <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المطعم بالعربية
            </label>
            <input
              type="text"
              id="name_ar"
              name="name_ar"
              value={restaurantSettings.name_ar}
              onChange={handleRestaurantSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المطعم بالإنجليزية
            </label>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={restaurantSettings.name_en}
              onChange={handleRestaurantSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline ml-2" />
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={restaurantSettings.phone}
              onChange={handleRestaurantSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline ml-2" />
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={restaurantSettings.email}
              onChange={handleRestaurantSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              العنوان
            </label>
            <textarea
              id="address"
              name="address"
              value={restaurantSettings.address}
              onChange={handleRestaurantSettingsChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* VAT and Hours */}
          <div>
            <label htmlFor="vat_percentage" className="block text-sm font-medium text-gray-700 mb-2">
              نسبة ضريبة القيمة المضافة (%)
            </label>
            <input
              type="number"
              id="vat_percentage"
              name="vat_percentage"
              value={restaurantSettings.vat_percentage}
              onChange={handleRestaurantSettingsChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="opening_hours" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline ml-2" />
              ساعات العمل
            </label>
            <input
              type="text"
              id="opening_hours"
              name="opening_hours"
              value={restaurantSettings.opening_hours}
              onChange={handleRestaurantSettingsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Save Button */}
          <div className="md:col-span-2">
            <button
              onClick={saveRestaurantSettings}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
            >
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </div>

      {/* Admin Users Management */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Users className="w-5 h-5 ml-2" />
          إدارة المديرين
        </h2>

        {/* Add New Admin */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة مدير جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={newAdmin.full_name}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, full_name: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <select
              value={newAdmin.role}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, role: e.target.value as any }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="staff">موظف</option>
              <option value="admin">مدير</option>
              <option value="super_admin">مدير عام</option>
            </select>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={addAdminUser}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة
            </button>
          </div>
        </div>

        {/* Admin Users List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المدير
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الدور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  آخر تسجيل دخول
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminUsers.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {admin.full_name || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      admin.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                      admin.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {admin.role === 'super_admin' ? 'مدير عام' :
                       admin.role === 'admin' ? 'مدير' : 'موظف'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      admin.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.last_login ? new Date(admin.last_login).toLocaleDateString('ar-SA') : 'لم يسجل دخوله'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => toggleAdminStatus(admin.id, admin.is_active)}
                        className={`${
                          admin.is_active ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {admin.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteAdminUser(admin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
