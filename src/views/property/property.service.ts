import ApiService from "@/services/ApiService";
import { ApiResponse, Category, Division, SubCategory, Type } from "./property.type";

export async function apiCreateProperty<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/property/create',
        method: 'post',
        data,
    })
}
export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}


//Division Api Service
export async function apiPostDivision<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<ApiResponse<Division>>({
        url: '/property/division',
        method: 'post',
        data,
    })
}

// Get all divisions
export async function apiGetAllDivision<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<ApiResponse<Division>>({
      url: '/property/division',
      method: 'get',
      data,
    });
  }
  
  // Get all types
  export async function apiGetAllType<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<ApiResponse<Type>>({
      url: '/property/type',
      method: 'get',
      data,
    });
  }

  // Get all category
  export async function apiGetAllCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<ApiResponse<Category>>({
      url: '/property/category',
      method: 'get',
      data,
    });
  }

  export async function apiGetAllSubCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<ApiResponse<SubCategory>>({
      url: '/property/sub-category',
      method: 'get',
      data,
    });
  }