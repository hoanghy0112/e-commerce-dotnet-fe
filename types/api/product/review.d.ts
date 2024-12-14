declare interface IReview {
  id: number;
  username: string;
  content: string;
  rating: number;
  productId: number;
  createdAt: string;
}

declare interface IUpdateReview {
  content: string;
  rating: number;
}

declare interface ICreateReview {
  username: string;
  content: string;
  rating: number;
  productId: number;
}
