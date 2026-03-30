import { getCurrentAdmin } from '@/lib/admin-auth-server'
import { AdminNavbar } from '@/components/admin/AdminNavbar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Try to get admin, but don't redirect if not found
  // Client-side auth will handle the redirect
  const admin = await getCurrentAdmin()

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <AdminNavbar admin={admin} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
