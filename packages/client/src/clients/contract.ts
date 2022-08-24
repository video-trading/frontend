import { Client } from "../supabase";

export interface Contract {
  id: string;
  name: string;
  description: string;
  code: string;
  created_at: Date;
}

export class ContractClient extends Client {
  async getContracts() {
    return await this.client.from<Contract>("contract").select("*");
  }
}
