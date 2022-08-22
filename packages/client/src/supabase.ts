import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class Supabase {
  static supabase = createClient(
    "https://ekdqxxobhdjawfazmjvk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZHF4eG9iaGRqYXdmYXptanZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjExNTAyOTAsImV4cCI6MTk3NjcyNjI5MH0.1mds_FLw1Fco5DJbBm9Dr5VwvO4M2twgAIOcufsOxKQ",
    {
      persistSession: true,
      autoRefreshToken: true,
    }
  );
}

export class Client {
  client: SupabaseClient;
  pageSize = 20;

  constructor() {
    this.client = Supabase.supabase;
  }

  /**
   * Get supabase pagination params by current page number
   * @param page Current Page
   * @returns
   */
  protected pagination(page: number) {
    const limit = this.pageSize ? +this.pageSize : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + this.pageSize : this.pageSize;

    return { from, to };
  }

  /**
   * Get total number of pages
   */
  protected totalPages(count: number) {
    const limit = this.pageSize;
    return Math.ceil(count / limit);
  }
}
