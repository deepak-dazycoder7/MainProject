  // Generic API Response Type
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T[];
  error: boolean;
}

// Base Type for common properties
export interface BaseEntity {
  id: number;
  name: string; // Common property
  status: boolean;
  description: string;
  created_by: number;
  deleted_by: number | null;
}

// Division Type
export interface Division extends BaseEntity {
  division_name: string; 
}

// Category Type
export interface Category extends BaseEntity {
  category_name: string; 
}

// Type Type 
export interface Type extends BaseEntity {
  type_name: string; 
}

// Type Sub-Category
export interface SubCategory extends BaseEntity {
  sub_category_name: string; 
}
