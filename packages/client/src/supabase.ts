import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class Client {
  client: SupabaseClient;
  pageSize = 20;

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        persistSession: true,
        autoRefreshToken: true,
      }
    );
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
