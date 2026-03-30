# Admin Panel Setup Guide

## Overview
This guide will help you set up the complete admin panel for your restaurant order system with Supabase integration.

## 🚀 Quick Start

### 1. Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Database Setup

Run these SQL migration files in your Supabase project in order:

1. `supabase/migrations/001_create_products_table.sql`
2. `supabase/migrations/002_create_orders_table.sql`
3. `supabase/migrations/003_create_order_items_table.sql`
4. `supabase/migrations/004_create_admin_users_table.sql`
5. `supabase/migrations/005_enable_rls_policies.sql`

### 3. Create First Admin User
After setting up the database, create your first super admin:

```sql
-- Create auth user (run in Supabase Auth section or via API)
-- Then create admin profile:
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES ('user_uuid_from_auth', 'admin@yourrestaurant.com', 'Super Admin', 'super_admin', true);
```

### 4. Storage Buckets
Create these storage buckets in Supabase:

1. `product-images` - For product images
2. `restaurant-assets` - For logos and other assets

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout with navbar
│   │   ├── login/page.tsx          # Admin login page
│   │   ├── dashboard/page.tsx      # Dashboard with stats
│   │   ├── products/
│   │   │   ├── page.tsx            # Products list
│   │   │   └── new/page.tsx        # Add new product
│   │   ├── orders/
│   │   │   ├── page.tsx            # Orders list
│   │   │   └── [id]/page.tsx       # Order details
│   │   ├── analytics/page.tsx       # Analytics dashboard
│   │   └── settings/page.tsx        # Settings & admin management
├── components/admin/
│   └── AdminNavbar.tsx             # Admin navigation
├── lib/
│   ├── supabase.ts                 # Supabase client & types
│   └── admin-auth.ts               # Auth helpers
└── middleware.ts                   # Route protection
```

## 🔐 Authentication & Security

### Features:
- **Protected Routes**: All admin routes require authentication
- **Role-Based Access**: Super admin, admin, and staff roles
- **Row Level Security**: Database policies for data protection
- **Session Management**: Secure cookie-based sessions

### Access Levels:
- **Super Admin**: Full access including settings and user management
- **Admin**: Access to products, orders, analytics
- **Staff**: Limited access (can be customized)

## 📊 Features Overview

### Dashboard (`/admin/dashboard`)
- Real-time stats (today's orders, revenue, pending orders)
- Recent orders table with quick status updates
- Quick action buttons
- Real-time order notifications

### Products Management (`/admin/products`)
- **Grid/List View**: Toggle between views
- **CRUD Operations**: Create, read, update, delete products
- **Image Upload**: Drag & drop image upload to Supabase Storage
- **Search & Filter**: By name, category, availability
- **Quick Actions**: Toggle availability, edit, delete

### Orders Management (`/admin/orders`)
- **Advanced Filtering**: Status, date range, order type, search
- **Real-time Updates**: Live order status changes
- **Bulk Actions**: Export to CSV
- **Order Details**: Complete order information with timeline
- **Status Management**: Visual timeline with one-click updates

### Analytics (`/admin/analytics`)
- **Revenue Charts**: Line charts for revenue trends
- **Order Analytics**: Bar charts for order patterns
- **Product Performance**: Top-selling products
- **Hourly Analysis**: Peak hours heatmap
- **Export Options**: CSV export functionality

### Settings (`/admin/settings`)
- **Restaurant Info**: Name, contact, hours, VAT
- **Logo Management**: Upload restaurant logo
- **Admin Management**: Add/remove admin users
- **Role Assignment**: Super admin, admin, staff roles

## 🎨 UI/UX Features

### Arabic RTL Support
- Full RTL layout support
- Arabic interface throughout
- Proper text alignment and navigation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface

### Real-time Features
- Live order notifications
- Real-time status updates
- Auto-refreshing data

## 🔧 Technical Implementation

### Database Schema
- **Products**: Menu items with pricing and categories
- **Orders**: Customer orders with status tracking
- **Order Items**: Junction table for order details
- **Admin Users**: Extended auth profiles with roles

### Security Features
- Row Level Security (RLS) policies
- JWT token authentication
- Protected API routes
- Input validation and sanitization

### Performance
- Optimized database queries
- Efficient data loading
- Image optimization with Supabase Storage
- Client-side caching

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repo to Vercel
2. Add environment variables
3. Deploy with automatic builds

### Environment Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📱 Access URLs

After deployment:
- **Admin Panel**: `https://admin.yourdomain.com`
- **Customer Site**: `https://yourdomain.com`

## 🔍 Testing

### Test Accounts
Create test admin users with different roles:
- Super admin: Full access
- Admin: Products and orders
- Staff: Limited access

### Test Features
1. Login/logout functionality
2. Product CRUD operations
3. Order status updates
4. Real-time notifications
5. Analytics data
6. Settings management

## 🛠️ Customization

### Adding New Features
1. Update database schema with migrations
2. Add TypeScript interfaces in `lib/supabase.ts`
3. Create new pages in `src/app/admin/`
4. Update navigation in `AdminNavbar.tsx`

### Styling
- Uses Tailwind CSS
- Amber color scheme for branding
- Consistent component patterns
- RTL-first design approach

## 📞 Support

For issues or questions:
1. Check the Supabase dashboard for database issues
2. Review browser console for JavaScript errors
3. Verify environment variables are correctly set
4. Check middleware configuration for route protection

---

**Note**: This admin panel is designed to work with your existing customer-facing restaurant website. Make sure both applications share the same Supabase project for seamless data synchronization.
