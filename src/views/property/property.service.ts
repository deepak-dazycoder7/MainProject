import ApiService from "@/services/ApiService";

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
export async function apiCreateDivision<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/property/division',
        method: 'post',
        data,
    })
}

export async function apiGetAllProperty<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/property/division',
        method: 'get',
        data,
    })
}