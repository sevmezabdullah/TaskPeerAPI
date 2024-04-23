import { inject, injectable } from "inversify";
import { ICategoryService } from "../interfaces/category/ICategoryService";
import { Category } from "../models/CategoryModel";
import { ResponseStatus, ServiceResponse } from "../utils/ServiceResponse";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import { INTERFACE_TYPE } from "../utils";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CategoryService implements ICategoryService {
    private repository: ICategoryRepository;



    constructor(@inject(INTERFACE_TYPE.CategoryRepository) repository: ICategoryRepository) {
        this.repository = repository;
    }

    async createCategory(category: Category): Promise<ServiceResponse<any | null>> {
        try {
            const result = await this.repository.createCategory(category);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Kategori Oluşturuldu", null, StatusCodes.OK)
            }
            return new ServiceResponse(ResponseStatus.Failed, "Kategori oluşturulurken hata meydana geldi", null, StatusCodes.BAD_REQUEST)
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Kategori oluşturulurken hata meydana geldi : " + error, null, StatusCodes.BAD_REQUEST)
        }

    }
    async deleteCategory(id: number): Promise<ServiceResponse<any | null>> {
        try {
            const result = await this.repository.deleteCategory(id);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Kategori silindi", null, StatusCodes.OK)
            }
            return new ServiceResponse(ResponseStatus.Failed, "Kategori silinirken bir hata meydana geldi.", null, StatusCodes.BAD_REQUEST)
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Kategori silinirken bir hata meydana geldi : " + error, null, StatusCodes.BAD_REQUEST)
        }
    }
    async getCategories(userId: number): Promise<ServiceResponse<any | null>> {
        try {
            const result = await this.repository.getCategories(userId);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Kategoriler getirildi", result, StatusCodes.OK)
            }
            return new ServiceResponse(ResponseStatus.Failed, "Kategoriler getirilirken bir hata meydana geldi.", null, StatusCodes.BAD_REQUEST)
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Kategoriler getirilirken bir hata meydana geldi : " + error, null, StatusCodes.BAD_REQUEST)
        }
    }
    async getCategoryById(id: number): Promise<ServiceResponse<any | null>> {
        try {
            const result = await this.repository.getCategoryById(id);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Kategori getirildi", result, StatusCodes.OK)
            }
            return new ServiceResponse(ResponseStatus.Failed, "Kategori getirilirken bir hata meydana geldi.", null, StatusCodes.BAD_REQUEST)
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Kategori getirilirken bir hata meydana geldi : " + error, null, StatusCodes.BAD_REQUEST)
        }

    }
    async updateCategory(category: Category): Promise<ServiceResponse<null>> {
        try {
            const result = await this.repository.updateCategory(category);
            if (result) {
                return new ServiceResponse(ResponseStatus.Success, "Kategori güncellendi", null, StatusCodes.OK)
            }
            return new ServiceResponse(ResponseStatus.Failed, "Kategori güncellenirken bir hata meydana geldi.", null, StatusCodes.BAD_REQUEST)
        } catch (error) {
            return new ServiceResponse(ResponseStatus.Failed, "Kategori güncellenirken bir hata meydana geldi : " + error, null, StatusCodes.BAD_REQUEST)
        }
    }
}