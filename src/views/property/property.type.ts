  export type PropertyResponse = {
    message: string;
    status: number;
    data: PropertyData;
    error: boolean;
  }
  
  export type PropertyData = {
    property_name: string;
    description: string;
    price: number;
    location: string;
    isAvailable: boolean;
    amenities: string[];
    availableFrom: string; 
    availableTo: string;   
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    created_by: number;
    images: string[] | null;
    videos: string[] | null;
    deleted_by: number | null;
    id: number;
  }
  