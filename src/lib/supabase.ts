/**
 * Supabase Client Configuration
 * Handles database connection for admin panel
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://scigawfqnvovnyyfohix.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaWdhd2ZxbnZvdm55eWZvaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Njk3MjksImV4cCI6MjA4MTI0NTcyOX0.lEEah05ZSEVpVaTf3I7MwK20jGp7j0XCXRJ-5fu-n7E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Prospect {
  id: string
  name: string
  platform: string
  slug: string
  created_at: string
  updated_at: string
}

export interface AdminSession {
  id: string
  email: string
}
