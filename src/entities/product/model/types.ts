export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly tags: string[];
  readonly thumbnail: string;
}

export interface ProductsResponse {
  readonly products: Product[];
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}
