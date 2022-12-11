import axios from "axios";
import { SignedUrl } from "./StorageService";

export interface GetCategoryResponse {
  id: string;
  name: string;
  SubCategory: {
    id: string;
    name: string;
  }[];
}

export class CategoryService {
  static async getCategories(): Promise<GetCategoryResponse[]> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/category`;
    const category = await axios.get(url, {});
    return category.data;
  }
}
