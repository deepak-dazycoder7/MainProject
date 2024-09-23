import ApiService from "@/services/ApiService";
import { PropertyResponse } from "./property.type";


export async function createPropertyApi(data: PropertyResponse) {
    return ApiService.fetchData<PropertyResponse>({
        url: '/property/create',
        method: 'post',
        data,
    })
}