declare interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  discount_price: number;
  rating: number;
  availability: boolean;
  storage: string[];
  colors: string[];
  categories: ICategory[];
}

declare interface ICategoryDTO {
  id: number;
  name: string;
  isBanner?: boolean;
  image?: string;
  description?: string;
}

declare interface IAdminProduct {
  id: number;
  name: string;
  images: string[];
  price: number;
  discountPrice: number;
  rating: number;
  availability: boolean;
  colors: string[];
  categories: ICategory[];
  stock: number;
  importPrice: number;
  storageOptions: string[];
  storageModifiers: number[];
  description: string;
  specifications: {
    [key: string]: string;
  };
  isBestSeller: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  releaseDate: string;
}

declare interface UpsertProductDTO {
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  availability: boolean;
  importPrice: number;
  colors: string[];
  storageOptions: string[];
  storageModifiers: number[];
  images: string[];
  description: string;
  specifications: {
    [key: string]: string;
  };
  isBestSeller: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  releaseDate: string;
  categoryIds: number[];
}
