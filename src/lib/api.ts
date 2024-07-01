import axios, { AxiosInstance } from "axios";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export enum types {
  OIL_DIFFUSERS = "oil-diffusers",
  CANDLES = "candles",
  COLLECTIONS = "collections",
}

export type Product = {
  id: number;
  attributes: {
    product_id: string;
    title: string;
    name: string;
    description: string;
    amount: number;
    colors: string;
    types: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: string;
    unique: boolean;
    details: string;
    quantity: number;
    is_unique: boolean;
  };
};

export type Order = {
  customer_name: string;
  customer_email: string;
  address: string;
  items: Array<{
    product: {
      id: number;
      attributes: {
        name: string;
        price: number;
      };
    };
    quantity: number;
  }>;
};

type ApiResponse = {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type SingleProductResponse = {
  data: Product;
};

export const instance: AxiosInstance = axios.create({
  baseURL: "https://uhohbe-2bcc378a9bba.herokuapp.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getUniqueProducts = async (): Promise<ApiResponse> => {
  const response = await instance.get<ApiResponse>(
    "/api/products?filters[is_unique][$eq]=true"
  );
  return response.data;
};

export const getProduct = async (
  color: string,
  sort: string,
  type: string
): Promise<ApiResponse> => {
  let url = `/api/products?filters[types][$eq]=${type}`;
  if (color) {
    url += `&filters[colors][$eq]=${color}`;
  }

  if (sort) {
    switch (sort) {
      case "newest":
        url += "&sort=createdAt:desc";
        break;
      case "oldest":
        url += "&sort=createdAt:asc";
        break;
      case "price-low-to-high":
        url += "&sort=amount:asc";
        break;
      case "price-high-to-low":
        url += "&sort=amount:desc";
        break;
    }
  }
  const response = await instance.get<ApiResponse>(url);
  return response.data;
};

export const getProductById = async (
  id: string
): Promise<SingleProductResponse> => {
  const response = await instance.get<SingleProductResponse>(
    `/api/products/${id}`
  );
  return response.data;
};

export const createOrder = async (payload: Order): Promise<any> => {
  const response = await instance.post("/api/orders", {
    data: {
      ...payload,
    },
  });
  return response.data;
};

export const getOrder = async (id: string): Promise<any> => {
  const response = await instance.get(
    `/api/orders/${id}?populate[items][populate]=*`
  );
  return response.data;
};
