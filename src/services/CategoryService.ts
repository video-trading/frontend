import axios from "axios";

export interface GetCategoryResponse {
  id: string;
  name: string;
  subCategories: {
    id: string;
    name: string;
  }[];

  parent: GetCategoryResponse;
}

export class CategoryNode {
  id: string;
  name: string;
  subCategories: CategoryNode[] | null;
  parent: CategoryNode | null = null;

  constructor(
    id: string,
    name: string,
    parent: CategoryNode | null = null,
    subCategories: { id: string; name: string }[] | null = null
  ) {
    this.id = id;
    this.name = name;
    this.subCategories =
      subCategories?.map(
        (subCategory) =>
          new CategoryNode(subCategory.id, subCategory.name, this)
      ) ?? null;
    this.parent = parent;
  }
}

export class CategoryService {
  static async getCategories(): Promise<GetCategoryResponse[]> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/category`;
    const category = await axios.get(url, {});
    return category.data;
  }

  static getCategoriesTree(categories: GetCategoryResponse[]): CategoryNode[] {
    const categoriesTree: CategoryNode[] = [];
    for (const category of categories) {
      categoriesTree.push(
        new CategoryNode(
          category.id,
          category.name,
          null,
          category.subCategories
        )
      );
    }
    return categoriesTree;
  }

  static async getCategoryById(
    categoryId: string
  ): Promise<GetCategoryResponse> {
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/category` + `/${categoryId}`;
    const category = await axios.get(url, {});
    return category.data;
  }
}
