import { supabase, AdminUser } from "./supabase";

// Client-side authentication utilities
export class AdminAuthClient {
  // Get current admin user from session
  static async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", user.id)
        .eq("is_active", true)
        .single();

      if (adminError || !adminUser) {
        return null;
      }

      return adminUser;
    } catch (error) {
      console.error("Error getting current admin:", error);
      return null;
    }
  }

  // Sign in admin
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      console.error("Sign in error:", error);
      return { data: null, error };
    }
  }

  // Sign out admin
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error("Sign out error:", error);
      return { error };
    }
  }

  // Update last login
  static async updateLastLogin(userId: string) {
    try {
      await supabase
        .from("admin_users")
        .update({ last_login: new Date().toISOString() })
        .eq("id", userId);
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  // Listen to auth changes
  static onAuthChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
