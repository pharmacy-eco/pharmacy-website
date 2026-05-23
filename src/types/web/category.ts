interface ICategory {
  id: number;
  name: string;
  image: string;
  meta_name: string;
  type: string;
  slug: string;
  children: ICategory[];
}

interface ICategoryBlog {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  meta_title: string;
  meta_description: string;
}

export type { ICategory, ICategoryBlog };
