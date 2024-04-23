import { Category } from "../../models/CategoryModel";
import { ServiceResponse } from "../../utils/ServiceResponse";

export interface ICategoryService {
    createCategory(category: Category): Promise<ServiceResponse>;
    deleteCategory(id: number): Promise<ServiceResponse>;
    getCategories(userId: number): Promise<ServiceResponse>;
    getCategoryById(id: number): Promise<ServiceResponse>;
    updateCategory(category: Category): Promise<ServiceResponse>;
}