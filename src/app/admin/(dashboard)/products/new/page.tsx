'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    price: '',
    category: 'قهوة',
    image_url: '',
    is_available: true,
    sort_order: '0'
  })

  const categories = ['قهوة / Coffee', 'حلويات / Desserts', 'مشروبات / Drinks']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData(prev => ({ ...prev, image_url: '' }))
  }

  const handleImageUpload = async () => {
    if (!imageFile) return null

    try {
      const imageUrl = await uploadToCloudinary(imageFile)
      return imageUrl
    } catch (error) {
      console.error('Image upload failed:', error)
      alert(language === 'ar' ? 'فشل رفع الصورة، يرجى المحاولة مرة أخرى' : 'Image upload failed, please try again')
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.image_url

      // Upload image if provided
      if (imageFile) {
        const uploadedUrl = await handleImageUpload()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      // All fields are now optional - use defaults if not provided
      const name_ar = formData.name_ar || (language === 'ar' ? 'منتج جديد' : 'New Product')
      const description_ar = formData.description_ar || (language === 'ar' ? 'وصف المنتج' : 'Product description')
      const category = formData.category || 'قهوة'
      const price = parseFloat(formData.price) || 0
      
      // Use provided image URL or uploaded image
      const finalImageUrl = imageUrl || formData.image_url || ''

      // Insert product with optional fields
      const { error } = await supabase
        .from('products')
        .insert({
          name_ar: name_ar,
          name_en: formData.name_en || null,
          description_ar: description_ar,
          description_en: formData.description_en || null,
          price: price,
          category: category,
          image_url: finalImageUrl,
          is_available: formData.is_available,
          sort_order: parseInt(formData.sort_order) || 0
        })

      if (error) throw error

      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('حدث خطأ أثناء إنشاء المنتج')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          العودة للمنتجات
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">إضافة منتج جديد</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة المنتج
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {imagePreview || formData.image_url ? (
                <div className="relative">
                  <img
                    src={imagePreview || formData.image_url}
                    alt="Product preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-amber-600 hover:text-amber-700 font-medium">
                      اختر صورة
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-2">
                    أو اسحب وأفلت الصورة هنا
                  </p>
                </div>
              )}
            </div>

            {/* Image URL Input */}
            <div className="mt-3">
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                رابط الصورة (اختياري)
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arabic Name */}
            <div>
              <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم بالعربية
              </label>
              <input
                type="text"
                id="name_ar"
                name="name_ar"
                value={formData.name_ar}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم بالإنجليزية
              </label>
              <input
                type="text"
                id="name_en"
                name="name_en"
                value={formData.name_en}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arabic Description */}
            <div>
              <label htmlFor="description_ar" className="block text-sm font-medium text-gray-700 mb-2">
                الوصف بالعربية
              </label>
              <textarea
                id="description_ar"
                name="description_ar"
                value={formData.description_ar}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-2">
                الوصف بالإنجليزية
              </label>
              <textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                السعر (ريال)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                الفئة
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-2">
                الترتيب
              </label>
              <input
                type="number"
                id="sort_order"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Available */}
            <div className="flex items-center justify-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleInputChange}
                  className="ml-2 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">متاح للطلب</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ المنتج'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
