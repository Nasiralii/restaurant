import { getCurrentAdmin } from '@/lib/admin-auth-server'
import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AdminUser } from '@/lib/supabase'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  return (
    <LanguageProvider>
      <AdminLayoutContent admin={admin}>
        {children}
      </AdminLayoutContent>
    </LanguageProvider>
  )
}

function AdminLayoutContent({ children, admin }: { children: React.ReactNode; admin: AdminUser | null }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar admin={admin} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
