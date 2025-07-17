import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Brak SUPABASE_URL lub SUPABASE_ANON_KEY w .env')
  }
  
  export const supabase = createClient(supabaseUrl, supabaseKey)
