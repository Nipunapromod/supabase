import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://miokzsjumgfkzvuwclwr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pb2t6c2p1bWdma3p2dXdjbHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDQ3NzIsImV4cCI6MjA4MDA4MDc3Mn0.Hn34k9pXOmezA-vuNgW9a6f6LdmMHDRSF54BREH0WMY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
